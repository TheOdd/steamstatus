#! /usr/bin/env node

const ora = require('ora')
const got = require('got')
const chalk = require('chalk')

const getConsoleResult = (online, name, obj) => {
  if (online) {
    return (
      chalk.blue(name) +
      '\n' +
      '    ' +
      chalk.magenta('Online:    ') +
      chalk.green.bold('✔') +
      '\n' +
      '    ' +
      chalk.magenta('Ping time: ') +
      chalk.green(obj.time) +
      chalk.yellow(' ms')
    )
  } else {
    return (
      chalk.blue(name) +
      '\n' +
      '    ' +
      chalk.magenta('Online:    ') +
      chalk.red.bold('✖') +
      '\n' +
      '    ' +
      chalk.magenta('Ping time: ') +
      chalk.red.bold('✖')
    )
  }
}

const fetchSpin = ora('Fetching steam data').start()

got('steamgaug.es/api/v2')
.then(response => {
  fetchSpin.stop()
  const responseObj = JSON.parse(response.body)
  const communityOnline = !!responseObj.SteamCommunity.online
  const storeOnline = !!responseObj.SteamStore.online
  const userAPIOnline = !!responseObj.ISteamUser.online

  const community = getConsoleResult(communityOnline, 'Steam Community', responseObj.SteamCommunity)
  const store = getConsoleResult(storeOnline, 'Steam Store', responseObj.SteamStore)
  const userAPI = getConsoleResult(userAPIOnline, 'Steam User API', responseObj.ISteamUser)

  console.log(community)
  console.log(store)
  console.log(userAPI)
})
.catch(error => {
  fetchSpin.stop()
  console.log(chalk.red('An error has occurred while fetching the data. Either SteamGaug.es is down, or you\'re not connected to the internet.'))
})
