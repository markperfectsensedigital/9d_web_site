<?php

/* PDF form handling from https://github.com/codeshell/fpdm */

require('fpdm.php');




error_log ( "HERE WE ARE" );

$voter_ids = array();

foreach($_POST as $key => $value) {
   error_log("$key, $value");
   array_push($voter_ids, $value);
}
error_log ( "ENDED POST" );

$voter_id_clause = join(",",$voter_ids);

$mysqli = new mysqli('localhost', 'readonly', '1V3sXh#5PW', 'voter_registrations');
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = '';

$query_string = "SELECT VID,LastName,MiddleName,FirstName,Suffix,HouseNumber,HouseSuffix,StreetPreDirection,StreetName,StreetType,StreetPostDirection,UnitType,UnitNumber,ResidentialCity, ResidentialZip,BirthYear FROM voter_registrations WHERE (VID IN ($voter_id_clause)) LIMIT 5;";
error_log($query_string,0);
$result = $mysqli->query($query_string);

while($row = $result->fetch_array()) {
    $rows[] = $row;
}
$row_number = 0;
foreach($rows as $row) {

    $full_name = $row['FirstName'] . ' ' . $row['MiddleName'] . ' ' . $row['LastName'] . ' ' . $row['Suffix'];
    $full_address = $row['HouseNumber'] . ' ' . $row['HouseSuffix'] . ' ' . $row['StreetPreDirection'] . ' ' . $row['StreetName'] . ' ' . $row['StreetType'] . ' ' . $row['UnitType'] . ' ' . $row['UnitNumber'] . ' ' . $row['ResidentialCity'] . ' ' . $row['ResidentialZip'];

    $fields = array(
        "full_name_$row_number"    => $full_name,
        "full_address_$row_number"    => $full_address,
        "birth_year_$row_number"    => $row['BirthYear']    
    );

    /*
    
    $voter_id = $row['VID'];

    $response .= "<tr> <td><input type=\"checkbox\" id=\"vid_$row_number\" name=\"vid_$row_number\" value=\"$voter_id\"/></td> <td>" . 
    $full_name . 
    '</td> <td>' . 
    $full_address  .
    '</td> <td>' . 
    $row['BirthYear'] .
    ' </td> </tr>';

    $row_number++;*/
}

$pdf = new FPDM('petition_form_letter.pdf');
$pdf->Load($fields, false); // second parameter: false if field values are in ISO-8859-1, true if UTF-8
$pdf->Merge();
$pdf->Output('F','barfofilename2.pdf');

echo('All done');

$mysqli->close(); 










?>