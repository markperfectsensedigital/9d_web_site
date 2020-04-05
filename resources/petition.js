function assignEvents() {

    document.getElementById('circulator_explain').onclick = circulatorExplain
    document.getElementById('searchbutton').onclick = newlookup
}

function circulatorExplain() {
    alert('omg')
    document.getElementById('title').innerText = 'Circulator'
    var explanation = document.createElement('p')
    explanation.innerText = "The circulator is the person presenting the petition. The circulator's name, address, and phone number appear at the bottom of the petitition. You must select at least one signer to be the circulator."

    var circulatorExample = document.createElement('img')
    circulatorExample.src = '/resources/circulator_example.png'
    circulatorExample.style.width = '100%'
    var messageBody = document.getElementById('message')
    removeAllChildren(messageBody)
    messageBody.appendChild(explanation)
    messageBody.appendChild(circulatorExample)

    var modal = document.getElementById("message_box")
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = hideMessage
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function newlookup(e) {
    var numberAvailableRows = getNumberAvailableRows()
    //  alert("number rows checked " + numberAvailableRows)

    var fields = [
        document.getElementById('lastname'),
        document.getElementById('firstname'),
        document.getElementById('housenumber'),
        document.getElementById('birthyear')
    ]
    var pairs = []
    for (i = 0; i < fields.length; i++) {
        pairs[i] = fields[i].id + '=' + fields[i].value
    }
    var parameters = pairs.join('&')
    parameters += '&numberAvailableRows=' + numberAvailableRows

    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //   alert(this.responseText)
                var tbody = document.getElementById("retrieved_records")
                /* Empty the table of unchecked rows */

                if (tbody.childElementCount > 0) {
                    var child = tbody.firstElementChild
                    do {
                        nextChild = child.nextElementSibling
                        var voterCheckBox = child.getElementsByTagName('input')[0];
                        if (!voterCheckBox.checked) {
                            tbody.removeChild(child)
                        }
                        child = nextChild
                    } while (child !== null)
                }

                var voters = JSON.parse(this.responseText);
                for (var i = 0; i < voters.length; i++) {
                    var newRow = document.createElement("tr")
                    var checkCell = document.createElement("td")
                    var checkInput = document.createElement("input")
                    checkInput.type = "checkbox"
                    checkInput.name = "vidCheckbox_" + i
                    checkInput.id = "vidCheckbox_" + i
                    checkInput.value = voters[i].voterid
                    checkCell.append(checkInput)

                    var radioCell = document.createElement("td")
                    var radioInput = document.createElement("input")
                    radioInput.type = "radio"
                    radioInput.name = "circulator"
                    radioInput.id = "vidRadio_" + i
                    radioInput.value = voters[i].voterid
                    radioInput.onclick = showHideCirculator
                    radioCell.append(radioInput)

                    var nameCell = document.createElement("td")
                    nameCell.innerText = voters[i].fullName

                    var addressCell = document.createElement("td")
                    addressCell.innerText = voters[i].fullAddress

                    var birthyearCell = document.createElement("td")
                    birthyearCell.innerText = voters[i].birthYear



                    newRow.append(checkCell)
                    newRow.append(radioCell)
                    newRow.append(nameCell)
                    newRow.append(addressCell)
                    newRow.append(birthyearCell)

                    tbody.append(newRow)

                }

                var resultsTable = document.getElementById('results_table')
                resultsTable.style.display = "block"
            }
        }
    };
    xhttp.open("POST", "cgi-bin/record_lookup.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhttp.send(parameters);

}

function printforms(e) {
    var paramIndex = 0;
    e = e || window.event
    var vidBoxes = document.getElementsByTagName('input')
    var pairs = []
    for (i = 0; i < vidBoxes.length; i++) {
        if (vidBoxes[i].id.startsWith('vidCheckbox_') && vidBoxes[i].checked) {
            pairs[paramIndex] = vidBoxes[i].id + '=' + vidBoxes[i].value
            paramIndex++
        }
    }
    var parameters = pairs.join('&')
    parameters += '&circulatorID=' + document.querySelector('input[name="circulator"]:checked').value
    parameters += '&circulatorPhoneNumber=' + document.getElementById('circulator_phone_number').value
    //  alert(parameters)
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
              //  alert(this.responseText)

                var messageBody = document.getElementById('message')
                removeAllChildren(messageBody)

                document.getElementById('title').innerText = 'Petition ready'
                var downloadLink = document.createElement('a')
                var linkText = document.createTextNode("Click here to download and print your petition.");
                downloadLink.href = this.responseText
                downloadLink.download = "nine_districts_petition_form.pdf"
                downloadLink.appendChild(linkText);

                messageBody.appendChild(downloadLink)

                var lastLine = document.createElement('p')
                lastLine.textContent = 'Ensure every selected voter and the circulator sign the petition. Thank you!'

                messageBody.appendChild(lastLine)

                var modal = document.getElementById("message_box")
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = hideMessage
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            }
        }
    };
    xhttp.open("POST", "cgi-bin/print_form.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhttp.send(parameters);

}

function showHideCirculator(e) {

    document.getElementById('title').innerText = 'Circulator\'s phone number'

    var messageBody = document.getElementById('message')
    removeAllChildren(messageBody)

    var line1 = document.createElement('p')
    line1.textContent = 'The circulator\'s phone number appears in the lower-left corner of the petition.'
    var circulatorTable = document.createElement('table')
    var circulatorTableRow = document.createElement('tr')
    var circulatorTableCell = document.createElement('td')
    circulatorTableCell.innerText = 'Circulator\'s phone number\xa0'
    circulatorTableRow.appendChild(circulatorTableCell)

    circulatorPhoneInput = document.createElement('input')
    circulatorPhoneInput.type = 'tel'
    circulatorPhoneInput.id = 'circulator_phone_number'
    circulatorPhoneInput.name = 'circulator_phone_number'

    circulatorTableCell = document.createElement('td')
    circulatorTableCell.appendChild(circulatorPhoneInput)
    circulatorTableRow.appendChild(circulatorTableCell)

    circulatorTable.appendChild(circulatorTableRow)


    circulatorTableRow = document.createElement('tr')
    circulatorTableCell = document.createElement('td')
    circulatorTableCell.colSpan = 2
    circulatorButton = document.createElement('button')
    circulatorButton.className = 'btn btn-warning'
    circulatorButton.id = 'circulator_modal_close'
    circulatorButton.onclick = function () {
        modal.style.display = "none";
    }
    circulatorButton.textContent = 'Continue'
    circulatorTableCell.appendChild(circulatorButton)
    circulatorTableRow.appendChild(circulatorTableCell)
    circulatorTableRow.appendChild(circulatorTableCell)
    circulatorTable.appendChild(circulatorTableRow)


    messageBody.appendChild(line1)
    messageBody.appendChild(circulatorTable)

    var modal = document.getElementById("message_box")
    var span = document.getElementsByClassName("close")[0];
    var circulatorField = document.getElementById('circulator_phone_number')
    circulatorField.value = ''
    modal.style.display = "block";
    circulatorField.focus()
    span.onclick = hideMessage
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


}



function getNumberAvailableRows() {
    var numberCheckedRows = 0
    var vidBoxes = document.getElementsByTagName('input')
    for (i = 0; i < vidBoxes.length; i++) {
        if (vidBoxes[i].id.startsWith('vidCheckbox_') && vidBoxes[i].checked) {
            numberCheckedRows++
        }
    }
    return (5 - numberCheckedRows)
}

function removeAllChildren(n) {
    while (n.lastElementChild) {
        n.removeChild(n.lastElementChild);
    }
}

function hideMessage() {
    var modal = document.getElementById("message_box")
    modal.style.display = "none";
} 
