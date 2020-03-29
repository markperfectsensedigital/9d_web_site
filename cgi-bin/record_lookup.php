<?php

//echo("<p>First name: " . $_POST['firstname'] . "");

$response = <<<RESPONSE
<tr>
<td><input type="checkbox" /></td>
<td>Mark Lautman</td>
<td>11716 Magruder Ln., Rockville MD 20852</td>
<td>02/20/1960</td>
</tr>
<tr>
<td colspan="4">
  <input type="submit" />
</td>
</tr>

RESPONSE;
echo($response)
?>