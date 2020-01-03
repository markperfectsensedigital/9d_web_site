function insertHeader() {
    
    var headerHtml = '<div class="header">' + 
'    <div class="container">' +
'      <div class="row">' +
'        <div class="col-md-auto">' +
'          <a href="index.html"><img src="images/home-icon.png" class="img-fluid" alt="Nine Districts logo"/></a>' +
'        </div>' +
'        <div class="col">' +
'          <ul class="nav justify-content-center">' +
'            <li class="nav-item">' +
'              <a class="nav-link active" href="index.html">Home</a>' +
'            </li>' +
'            <li class="nav-item">' +
'              <a class="nav-link" href="why9d.html">Why Nine Districts?</a>' +
'            </li>' +
'            <li class="nav-item">' +
'              <a class="nav-link" href="leadership.html">Leadership</a>' +
'            </li>' +
'            <li class="nav-item">' +
'              <a class="nav-link" href="resources.html">Resources</a>' +
'            </li>' +
'            <li class="nav-item">' +
'              <a class="nav-link" href="donate.html">Donate</a>' +
'            </li>' +
'            <li class="nav-item">' +
'              <a class="nav-link" href="contact.html">Contact</a>' +
'            </li>' +
'          </ul>' +
'        </div> <!-- class="col" -->' +
'      </div> <!-- class="row" -->' +
'    </div> <!-- class="container" -->' +
'  </div> <!-- class="header" -->';

var headerNode = document.getElementById('header');
headerNode.innerHTML = headerHtml;
}