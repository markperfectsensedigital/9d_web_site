<?php

/*error_log ( "HERE WE ARE" );
foreach($_POST as $key => $value)
{
   error_log("$key => $value");
}
error_log ( "ENDED POST" );*/
$firstname =  $_POST['firstname'];
$lastname =  $_POST['lastname'];
$housenumber =  $_POST['housenumber'];
$birthyear =  $_POST['birthyear'];
$number_available_rows = $_POST['numberAvailableRows'];

$mysqli = new mysqli('localhost', 'readonly', '1V3sXh#5PW', 'voter_registrations');
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = '';
$where_clause = "WHERE (LastName = '$lastname') AND (FirstName = '$firstname') AND (BirthYear = '$birthyear')";

error_log($where_clause,0);

if ($housenumber != '' ) {
    $where_clause .= " AND (HouseNumber = '$housenumber')";
}

error_log($where_clause,0);

$query_string = "SELECT VID,LastName,MiddleName,FirstName,Suffix,HouseNumber,HouseSuffix,StreetPreDirection,StreetName,StreetType,StreetPostDirection,UnitType,UnitNumber,ResidentialCity, ResidentialZip,BirthYear FROM voter_registrations " . $where_clause . " ORDER BY LastName,FirstName,BirthYear LIMIT $number_available_rows";
error_log($query_string,0);
$result = $mysqli->query($query_string);

while($row = $result->fetch_array()) {
    $rows[] = $row;
}

$row_number = 0;
$list = array();
foreach($rows as $row) {

    $voter_record = array(
        'voterid' => $row['VID'],
        'fullName' => $row['FirstName'] . ' ' . $row['MiddleName'] . ' ' . $row['LastName'] . ' ' . $row['Suffix'], 
        'fullAddress' => $row['HouseNumber'] . ' ' . $row['HouseSuffix'] . ' ' . $row['StreetPreDirection'] . ' ' . $row['StreetName'] . ' ' . $row['StreetType'] . ' ' . $row['UnitType'] . ' ' . $row['UnitNumber'] . ' ' . $row['ResidentialCity'] . ' ' . $row['ResidentialZip'],
        'birthYear' => $row['BirthYear']);
    array_push($list,$voter_record);
 
}
header('Content-type: application/json');
echo json_encode( $list );

$mysqli->close(); 






?>