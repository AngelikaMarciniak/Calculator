const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const cleaning = document.querySelector('.clean')
const deleting = document.querySelector('.delete')
const equal = document.querySelector('.equality')
const lastAction = document.querySelector('.last-action')
const updateAction = document.querySelector('.update-action')
let action = ''
let operation = undefined
let lastActions = ''
const count = () => {
  let operating
  if(!lastActions || !action) {
    return
  }
  const last = parseFloat(lastActions)
  const updated = parseFloat(action)
  if(isNaN(last) || isNaN(updated)) {
    return
  }
  switch (operation) {
    case '+':
      operating = last + updated
      break
      case '-':
        operating = last - updated
      break
      case '×':
        operating = last * updated
      break
      case '÷':
      if(updated === 0)
      {
        cleanResult()
        return
      }
        operating = last / updated
      break
      case '^':
        operating = Math.pow(last, updated)
      break
      case '%':
        operating = last / 100 * updated
      break
      case '√':
        operating = Math.pow(last, 1 / updated)
      break
      case 'log':
        operating = Math.log(last) / Math.log(updated)
      break
    default:
      return
  }
  action = operating
  operation = undefined
  lastActions = ''
}
const chooseOperation = (operator) => {
  if(action === '') {
    return
  }
  if(lastActions !== '') {
    const last = lastAction.innerText
    if(action.toString() === '0' &&  last[last.length - 1] === '÷') {
      cleanResult()
      return
    }
    count()
  }
  operation = operator
  lastActions = action
  action = ''
}
const addNumber = (number) => {
  if(number === '•') {
    if(action.includes('.')) {
      return
    }
    number = '.'
  }
  action = action.toString() + number.toString()
}
const deleteNumber = () => {
  action = action.toString().slice(0, -1)
}
const updateResult = () => {
  updateAction.innerText = action
  if(operation != null) {
  lastAction.innerText = lastActions + operation
  } else {
    lastAction.innerText = ''
  }
}
const cleanResult = () => {
  action = ''
  operation = undefined
  lastActions = ''
}
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    addNumber(number.innerText)
    updateResult()
  })
})
operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    chooseOperation(operator.innerText)
    updateResult()
  })
})
equal.addEventListener('click', () => {
  count()
  updateResult()
})
deleting.addEventListener('click', () => {
  deleteNumber()
  updateResult()
})
cleaning.addEventListener('click', () => {
  cleanResult()
  updateResult()
})
