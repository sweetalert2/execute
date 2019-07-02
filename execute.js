const execa = require('execa')
const streamArray = require('./stream-array')

module.exports = (command, { skipLogging } = {}) => {
  const proc = execa(command, { shell: true })
  if (!skipLogging) {
    const formatLine = (line, label) => `    (pid:${proc.pid})\t[${label}]\t${line}\n`
    const formatStream = (stream, label) => stream
      .pipe(streamArray.split())
      .pipe(streamArray.map(line => formatLine(line, label)))

    process.stdout.write(formatLine(command, 'cmd'))
    streamArray.merge(formatStream(proc.stdout, 'out'), formatStream(proc.stderr, 'ERR'))
      .pipe(process.stdout)
  }

  return proc
}
