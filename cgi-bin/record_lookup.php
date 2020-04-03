<?php

error_log ( "HERE WE ARE" );
foreach($_POST as $key => $value)
{
   error_log("$key => $value");
}
error_log ( "ENDED POST" );
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

$query_string = "SELECT VID,LastName,MiddleName,FirstName,Suffix,HouseNumber,HouseSuffix,StreetPreDirection,StreetName,StreetType,StreetPostDirection,UnitType,UnitNumber,ResidentialCity, ResidentialZip,BirthYear FROM voter_registrations WHERE (LastName LIKE '$lastname%') AND (FirstName LIKE '$firstname%')  AND (HouseNumber LIKE '$housenumber%') AND (BirthYear LIKE '$birthyear%') ORDER BY LastName,FirstName,BirthYear LIMIT $number_available_rows";
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

 /*   $full_name = $row['FirstName'] . ' ' . $row['MiddleName'] . ' ' . $row['LastName'] . ' ' . $row['Suffix'];
    $full_address = $row['HouseNumber'] . ' ' . $row['HouseSuffix'] . ' ' . $row['StreetPreDirection'] . ' ' . $row['StreetName'] . ' ' . $row['StreetType'] . ' ' . $row['UnitType'] . ' ' . $row['UnitNumber'] . ' ' . $row['ResidentialCity'] . ' ' . $row['ResidentialZip'];
    $voter_id = $row['VID'];

    $response .= "<tr> <td><input type=\"checkbox\" id=\"vid_$row_number\" name=\"vid_$row_number\" value=\"$voter_id\"/></td>" . 
    "<td><input type=\"radio\" id=\"vid_$row_number\" name=\"circulator\" value=\"$voter_id\"  onclick=\"showHideCirculator(this)\"/></td><td>" . 
    $full_name . 
    '</td> <td>' . 
    $full_address  .
    '</td> <td>' . 
    $row['BirthYear'] .
    ' </td>' . 
    "<td><input class=\"circ_phone\" type=\"tel\" id=\"circulator_$row_number\" name=\"circulator_$row_number\" disabled/></td>" .
    '</tr>';

    $row_number++; */
}
header('Content-type: application/json');
echo json_encode( $list );
/*$response .= '<tr>
<td colspan="4">
 <button type="button" class="btn btn-warning"  onclick="printforms();">Submit</button>

</td>
</tr>';*/
$mysqli->close(); 










?>