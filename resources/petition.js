function assignEvents() {
    var fields = [
        document.getElementById('lastname'),
        document.getElementById('firstname'),
        document.getElementById('housenumber'),
        document.getElementById('city')
    ]
    /*   var lastname = document.getElementById('lastname')
       var firstname = document.getElementById('firstname')
       var housenumber = document.getElementById('housenumber')
       var city = document.getElementById('city')*/

    for (i = 0; i < fields.length; i++) {
        fields[i].onkeyup = newlookup
    }
}

function newlookup(e) {
    e = e || window.event;
    if ((e.keyCode >= 48) && (e.keyCode <= 90)) {
        var fields = [
            document.getElementById('lastname'),
            document.getElementById('firstname'),
            document.getElementById('housenumber'),
            document.getElementById('city')
        ]
        var pairs = []
        for (i = 0; i < fields.length; i++) {
            pairs[i]=fields[i].id + '=' + fields[i].value
        }
        var parameters = pairs.join('&')
  


       var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById('retrieved_records').innerHTML = this.responseText
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
            pairs[paramIndex]=vidBoxes[i].id + '=' + vidBoxes[i].value
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

  /*  if ((e.keyCode >= 48) && (e.keyCode <= 90)) {
        var fields = [
            document.getElementById('lastname'),
            document.getElementById('firstname'),
            document.getElementById('housenumber'),
            document.getElementById('city')
        ]
        var pairs = []
        for (i = 0; i < fields.length; i++) {
            pairs[i]=fields[i].id + '=' + fields[i].value
        }
        
  


       
       } */
}