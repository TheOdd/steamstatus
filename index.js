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
let community,
    store,
    userAPI,
    responseObj

got('steamgaug.es/api/v2')
.then(response => {
  fetchSpin.stop()
  const responseObj = JSON.parse(response.body)
  community = !!responseObj.SteamCommunity.online
  store = !!responseObj.SteamStore.online
  userAPI = !!responseObj.ISteamUser.online

  community = getConsoleResult(community, 'Steam Community', responseObj.SteamCommunity)
  store = getConsoleResult(store, 'Steam Store', responseObj.SteamStore)
  userAPI = getConsoleResult(userAPI, 'Steam User API', responseObj.ISteamUser)

  console.log(community)
  console.log(store)
  console.log(userAPI)
})
.catch(error => {
  fetchSpin.stop()
  console.log(chalk.red('An error has occurred while fetching the data. Either SteamGaug.es is down, or you\'re not connected to the internet.'))
})
