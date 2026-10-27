#!/usr/bin/env bash
set -euo pipefail

# Reusable CI bootstrap: never depend on slow Ubuntu apt mirrors.
supports_video_build() {
  command -v ffmpeg >/dev/null 2>&1 &&
  command -v ffprobe >/dev/null 2>&1 &&
  grep -Fq 'libx264' <<< "$(ffmpeg -hide_banner -encoders 2>/dev/null)" &&
  grep -Fq 'force_divisible_by' <<< "$(ffmpeg -hide_banner -h filter=scale 2>/dev/null)"
}

if supports_video_build; then
  echo "Using existing FFmpeg/FFprobe from the GitHub runner."
else
  echo "Installing pinned static media executables through npm (no apt)."
  npm install --no-save --package-lock=false ffmpeg-static@5.3.0 @ffprobe-installer/ffprobe@2.1.2
  mkdir -p "${RUNNER_TEMP:-/tmp}/dj-sona-media-bin"
  ln -sf "$(node -p 'require("ffmpeg-static")')" "${RUNNER_TEMP:-/tmp}/dj-sona-media-bin/ffmpeg"
  ln -sf "$(node -p 'require("@ffprobe-installer/ffprobe").path')" "${RUNNER_TEMP:-/tmp}/dj-sona-media-bin/ffprobe"
  export PATH="${RUNNER_TEMP:-/tmp}/dj-sona-media-bin:$PATH"
  if [[ -n "${GITHUB_PATH:-}" ]]; then
    echo "${RUNNER_TEMP:-/tmp}/dj-sona-media-bin" >> "$GITHUB_PATH"
  fi
fi

if ! supports_video_build; then
  echo "::error::FFmpeg must include libx264 and modern scaling options; ffprobe must be available."
  exit 1
fi

ffmpeg -hide_banner -version | sed -n '1p'
ffprobe -hide_banner -version | sed -n '1p'
echo "FFmpeg/FFprobe provisioning verified."
