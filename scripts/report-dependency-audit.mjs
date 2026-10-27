import { readFile, writeFile, appendFile } from 'node:fs/promises'

const inputs = [
  { scope: 'Todas as dependências', path: 'audit-all.json' },
  { scope: 'Somente produção', path: 'audit-production.json' },
]
const levels = ['critical', 'high', 'moderate', 'low']
const sections = [
  '# Auditoria de dependências — DJ Sona',
  '',
  'Relatório gerado por npm audit a partir do package-lock.json. Os alertas são potenciais e não indicam, por si só, exploração ou impacto no site publicado.',
  '',
  '| Escopo | Críticas | Altas | Moderadas | Baixas | Total |',
  '| --- | ---: | ---: | ---: | ---: | ---: |',
]
const details = []
for (const { scope, path } of inputs) {
  let parsed
  try {
    parsed = JSON.parse(await readFile(path, 'utf8'))
  } catch (error) {
    throw new Error('Auditoria não retornou JSON válido em ' + path + ': ' + error.message)
  }
  if (!parsed.metadata?.vulnerabilities || typeof parsed.vulnerabilities !== 'object') {
    throw new Error('Resposta incompleta do npm audit em ' + path + ' — não presumir zero vulnerabilidades')
  }
  const counts = parsed.metadata.vulnerabilities
  const vals = levels.map(level => Number(counts[level] || 0))
  const total = Number(counts.total || vals.reduce((a, b) => a + b, 0))
  sections.push('| ' + scope + ' | ' + [...vals, total].join(' | ') + ' |')
  const rows = Object.entries(parsed.vulnerabilities)
    .map(([name, item]) => ({
      name, severity: item.severity || 'unknown', direct: Boolean(item.isDirect),
      range: item.range || 'não informado',
      fix: item.fixAvailable === false ? 'Sem correção automática' :
        item.fixAvailable === true ? 'Correção disponível' :
          item.fixAvailable?.name ? 'Requer atualização: ' + item.fixAvailable.name : 'Verificar manualmente',
    }))
    .sort((a, b) => levels.indexOf(a.severity) - levels.indexOf(b.severity) || a.name.localeCompare(b.name))
  details.push({ scope, rows })
}
for (const { scope, rows } of details) {
  sections.push('', '## ' + scope, '')
  if (!rows.length) {
    sections.push('Nenhum alerta neste escopo.')
  } else {
    sections.push('| Pacote | Severidade | Direta | Versões afetadas | Tratamento informado |',
      '| --- | --- | --- | --- | --- |')
    for (const row of rows.slice(0, 60)) {
      const clean = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
      sections.push('| ' + clean(row.name) + ' | ' + clean(row.severity) +
        ' | ' + (row.direct ? 'Sim' : 'Não') + ' | ' + clean(row.range) + ' | ' + clean(row.fix) + ' |')
    }
    if (rows.length > 60) sections.push('', 'Lista resumida. Ver arquivos JSON anexos à execução.')
  }
}
sections.push('', '## Próximas ações', '',
  '1. Priorizar vulnerabilidades altas/críticas em dependências de produção.',
  '2. Atualizar dependências diretas em branch dedicada e regenerar o lockfile.',
  '3. Validar build Vite, transcodificação de mídias, Playwright e deploy do Pages.',
  '4. Não usar `npm audit fix --force` sem avaliar mudanças incompatíveis.',
  '')
const result = sections.join('\n')
await writeFile('audit-report.md', result)
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, result)
console.log(result)
