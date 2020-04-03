<?php

/* PDF form handling from https://github.com/codeshell/fpdm */

require('fpdm.php');


/*error_log ( "HERE WE ARE" ); */

$voter_ids = array();

foreach($_POST as $key => $value) {
//    error_log("$key, $value", 0);
     if (substr( $key, 0, 11 ) === "vidCheckbox") {
      array_push($voter_ids, $value);
}
}


$voter_id_clause = join(",",$voter_ids);
$circulator_id = $_POST["circulatorID"];
$circulator_phone = $_POST["circulatorPhoneNumber"];

$mysqli = new mysqli('localhost', 'readonly', '1V3sXh#5PW', 'voter_registrations');
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = '';

$query_string = "SELECT VID,LastName,MiddleName,FirstName,Suffix,HouseNumber,HouseSuffix,StreetPreDirection,StreetName,StreetType,StreetPostDirection,UnitType,UnitNumber,ResidentialCity, ResidentialZip,BirthYear FROM voter_registrations WHERE (VID IN ($voter_id_clause)) LIMIT 5";
//error_log($query_string,0);
$result = $mysqli->query($query_string);

while($row = $result->fetch_array()) {
    $rows[] = $row;
}
$row_number = 0;
$fields = array();
foreach($rows as $row) {

    $full_name = $row['FirstName'] . ' ' . $row['MiddleName'] . ' ' . $row['LastName'] . ' ' . $row['Suffix'];
    $full_address = $row['HouseNumber'] . ' ' . $row['HouseSuffix'] . ' ' . $row['StreetPreDirection'] . ' ' . $row['StreetName'] . ' ' . $row['StreetType'] . ' ' . $row['UnitType'] . ' ' . $row['UnitNumber'] . ' ' . $row['ResidentialCity'] . ' ' . $row['ResidentialZip'];


    $full_name = preg_replace('/\s+/', ' ', $full_name);
    $full_address = preg_replace('/\s+/', ' ', $full_address);

   /* array_push($fields, array(
        "full_name_$row_number"    => $full_name,
        "full_address_$row_number"    => $full_address,
        "birth_year_$row_number"    => $row['BirthYear']    
    ));*/
    $fields["full_name_$row_number"] = $full_name;
    $fields["full_address_$row_number"] = $full_address;
    $fields["birth_year_$row_number"]  = $row['BirthYear'];

    $row_number++;
}




$query_string = "SELECT VID,LastName,MiddleName,FirstName,Suffix,HouseNumber,HouseSuffix,StreetPreDirection,StreetName,StreetType,StreetPostDirection,UnitType,UnitNumber,ResidentialCity, ResidentialZip FROM voter_registrations WHERE (VID = $circulator_id) LIMIT 1";
//error_log($query_string,0);
$result = $mysqli->query($query_string);
$row = $result->fetch_array();
$circulator_line_1 =  $row['FirstName'] . ' ' . $row['MiddleName'] . ' ' . $row['LastName'] . ' ' . $row['Suffix'] . $row['HouseNumber'] . ' ' . $row['HouseSuffix'] . ' ' . $row['StreetPreDirection'] . ' ' . $row['StreetName'] . ' ' . $row['StreetType'] . ' ' . $row['UnitType'] . ' ' . $row['UnitNumber'];

$circulator_line_1 = preg_replace('/\s+/', ' ', $circulator_line_1);

$circulator_line_2 = $row['ResidentialCity'] . ', MD ' . $row['ResidentialZip'] ;


$fields["circulator_name_street"] = $circulator_line_1;
$fields["circulator_city_state_zip"] = $circulator_line_2;
$fields["circulator_phone"]  =  $circulator_phone;

//error_log(json_encode($fields),0);
$filename = time();
$pdf = new FPDM('petition_form_letter.pdf');
$pdf->Load($fields, false); // second parameter: false if field values are in ISO-8859-1, true if UTF-8
$pdf->Merge();
$pdf->Output('F',"../downloaded_forms/$filename.pdf");

echo('All done');

$mysqli->close(); 










?>