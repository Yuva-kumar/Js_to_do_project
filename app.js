
let content = document.querySelector('body')
let todoListDiv = document.createElement('div')
todoListDiv.className = 'todoList-class'
content.append(todoListDiv)
todoListDiv.style.marginTop = '5%';

const newData = localStorage.getItem('user')
const dataUpdate = JSON.parse(newData)


for (let item of dataUpdate) {
    let checkBox = extractor(item[1], todoListDiv)
    checkBox.checked = item[0]
    if (item[0]) {
        checkBox.dispatchEvent(new Event('change'))
    }
}




let addButton = document.getElementsByClassName('add-button')[0]
addButton.style.fontSize = '1rem'




// checkbox functionality
function checkBoxCheck(checkBox, textDiv) {

    if (checkBox.checked) {
        textDiv.style.textDecoration = 'line-through'
        textDiv.style.color = 'green'
    } else {
        textDiv.style.textDecoration = 'none'
        textDiv.style.color = 'black'
    }
}


// select div 

function selectDivFunctionality(selectDiv, newDiv) {
    let functionality = selectDiv.value
    let parent = newDiv.parentElement

    if (functionality === 'Delete') {
        let confirmDelete = confirm('Are you sure to delete the task...')
        if (confirmDelete) {
            newDiv.remove()
        }
    }

    else if (functionality === 'Move up') {
        let previousOne = newDiv.previousElementSibling;

        if (previousOne) {
            parent.insertBefore(newDiv, previousOne)
        }
    }
    else if (functionality === 'Move Down') {
        let nextOne = newDiv.nextElementSibling;
        if (nextOne) {
            parent.insertBefore(newDiv, nextOne.nextSibling)
        }
    }

    // resest the select dropdown
    selectDiv.selectedIndex = 0;
}



function extractor(text, todoListDiv) {


    let newDiv = document.createElement('div')
    newDiv.className = 'new-class'
    newDiv.style.border = 'solid black 1px';
    newDiv.style.display = 'flex'
    newDiv.style.justifyContent = 'space-between'
    newDiv.style.fontSize = '1rem'




    if (text === '') {
        alert('please enter todo details')
        return
    }


    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.style.marginRight = '1rem'
    // checkBox.sty

    checkBox.addEventListener('change', () => {
        checkBoxCheck(checkBox, textDiv)
        updateLocalStorage()
    })



    let addText = document.createTextNode(text)
    let textDiv = document.createElement('div')

    textDiv.className = 'text-class'
    textDiv.appendChild(checkBox)
    textDiv.appendChild(addText)
    textDiv.style.display = 'flex'
    textDiv.style.wordBreak = 'break-word'

    // select div arrangement 
    let selectDiv = document.createElement('select')
    selectDiv.style.fontSize = '1rem'
    selectDiv.style.height = '20px'
    selectDiv.style.display



    let defaultOption = document.createElement('option')
    defaultOption.textContent = 'select'
    defaultOption.setAttribute('value', '')
    defaultOption.setAttribute('disabled', true)
    defaultOption.setAttribute('selected', true)
    selectDiv.appendChild(defaultOption)

    let option1 = document.createElement('option')
    option1.setAttribute('value', 'Move up')
    option1.textContent = 'Move up '
    selectDiv.appendChild(option1)

    let option2 = document.createElement('option')
    option2.setAttribute('value', 'Delete')
    option2.textContent = 'Delete'
    selectDiv.appendChild(option2)

    let option3 = document.createElement('option')
    option3.setAttribute('value', 'Move Down')
    option3.textContent = 'Move Down'
    selectDiv.appendChild(option3)
    selectDiv.style.backgroundColor = 'aliceblue'

    selectDiv.addEventListener('change', () => {
        selectDivFunctionality(selectDiv, newDiv)
        updateLocalStorage()
    })


    newDiv.appendChild(textDiv)
    newDiv.appendChild(selectDiv)

    newDiv.style.marginTop = '2%';
    newDiv.style.backgroundColor = 'aliceblue'
    newDiv.style.border = 'solid 2px orange'
    newDiv.style.padding = '1%'
    newDiv.style.display = 'flex'
    newDiv.style.alignItems = 'center'



    todoListDiv.appendChild(newDiv)

    updateLocalStorage()
    return checkBox


}

addButton.addEventListener('click', () => {
    let inputField = document.getElementById('todo-input')
    inputField.style.fontSize = '1rem'
    inputField.style.padding = '1%';

    const text = inputField.value;
    inputField.value = '';
    extractor(text, todoListDiv)
    updateLocalStorage()

})



function updateLocalStorage() {
    let dataArray = []
    let childData = todoListDiv.children
    for (let item of childData) {
        dataArray.push([item.firstChild.firstChild.checked, item.firstChild.lastChild.textContent])
    }

    localStorage.setItem('user', JSON.stringify(dataArray));

}

