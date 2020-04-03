function assignEvents() {
    var fields = [
        document.getElementById('lastname'),
        document.getElementById('firstname'),
        document.getElementById('housenumber'),
        document.getElementById('birthyear')
    ]

    for (i = 0; i < fields.length; i++) {
        fields[i].onkeyup = newlookup
    }
}

function newlookup(e) {
    e = e || window.event;
    if (((e.keyCode >= 48) && (e.keyCode <= 90)) ||  /* alphanum */
        ((e.keyCode >= 96) && (e.keyCode <= 104)) || /* keypad */
        (e.keyCode == 8) || (e.keyCode == 46) /* backspace and delete */
    ) {
        var numberAvailableRows = getNumberAvailableRows();
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
                        checkInput.name = "vid_" + i
                        checkInput.id = "vid_" + i
                        checkInput.value = voters[i].voterid
                        checkCell.append(checkInput)

                        var radioCell = document.createElement("td")
                        var radioInput = document.createElement("input")
                        radioInput.type = "radio"
                        radioInput.name = "circulator"
                        radioInput.id = "vid_" + i
                        radioInput.value = voters[i].voterid
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
                }
            }
        };
        xhttp.open("POST", "cgi-bin/record_lookup.php", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhttp.send(parameters);
    }
}

function printforms(e) {
    var paramIndex = 0;
    e = e || window.event
    var vidBoxes = document.getElementsByTagName('input')
    var pairs = []
    for (i = 0; i < vidBoxes.length; i++) {
        if (vidBoxes[i].id.startsWith('vid') && vidBoxes[i].checked) {
            pairs[paramIndex] = vidBoxes[i].id + '=' + vidBoxes[i].value
            paramIndex++
        }
    }
    var parameters = pairs.join('&')
    alert(parameters)
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert(this.responseText)
            }
        }
    };
    xhttp.open("POST", "cgi-bin/print_form.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhttp.send(parameters);

}

function showHideCirculator(e) {
    var rowID = e.id.substring(e.id.indexOf("_") + 1)
    var enabledCirculatorPhone = 'circulator_' + rowID
    var circulatorPhones = document.getElementsByTagName('input')
    for (var i = 0; i < circulatorPhones.length; i++) {
        if (circulatorPhones[i].id.startsWith('circulator')) {
            circulatorPhones[i].disabled = (circulatorPhones[i].id != enabledCirculatorPhone)
        }
    }


}

function getNumberAvailableRows() {
    var numberCheckedRows = 0
    var vidBoxes = document.getElementsByTagName('input')
    for (i = 0; i < vidBoxes.length; i++) {
        if (vidBoxes[i].id.startsWith('vid') && vidBoxes[i].checked) {
            numberCheckedRows++
        }
    }
    return (5 - numberCheckedRows)
}
