var servResponse = document.querySelector('#responce');


document.forms.register.onsubmit = function(event){
    event.preventDefault();

    let username = document.forms.register.username;
    let email =document.forms.register.email;
    let password1 = document.forms.register.password1;
    let password2 = document.forms.register.password2;

    var empty = /^\s+|\s+$/g;

    username.value.replace(empty, '');
    email.value.replace(empty, '');
    password1.value.replace(empty, '');
    password2.value.replace(empty, '');

    let isCorrect = true;

    if (!username.value || username.value.length > 50) //проверить на наличие в БД
        isCorrect = incorrect(username);
    else
        correct(username);

    if (!email.value || email.value.length > 50)
        isCorrect = incorrect(email);
    else
        correct(email);    

    if (!password1.value || password1.value.length > 50)
        isCorrect = incorrect(password1);
    else
        correct(password1);

    if (password1.value != password2.value)
        isCorrect = incorrect(password2);

    if (!password2.value)
        isCorrect = incorrect(password2);
    else
        correct(password2);
    
    console.log(isCorrect);

    if (isCorrect == true)
    {
        var XHR = new XMLHttpRequest();
        XHR.open('POST', '/register');
        var formData = new FormData(document.forms.register);

        XHR.send(formData);
        console.log(formData);

        XHR.onreadystatechange = function()
        {
            if (XHR.readyState == 4 && XHR.status == 200)
            {
                servResponse.textContent = XHR.responseText;
            }
        }
    }
    else
        servResponse.textContent = 'Введены некорректные данные';

    console.log(isCorrect);
};


var styleExpand = new Map();

async function incorrect(id)
{
    if (styleExpand.has(id.name))
        return false;

    styleExpand.set(id.name, document.createElement('style'));
    styleExpand.get(id.name).innerHTML = '#' + id.name + `{
        background-color: #ff0000;
    }`;
    document.body.appendChild(styleExpand.get(id.name));
    return false;
}

async function correct(id)
{
    if (styleExpand.has(id.name))
    {
        document.body.removeChild(styleExpand.get(id.name));
        styleExpand.delete(id.name);
    }
}