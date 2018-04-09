$(document).ready(function() {
$('#formulariouser') .bootstrapValidator({
message: 'This value is not valid',
feedbackIcons: {
valid: 'glyphicon glyphicon-ok',
invalid: 'glyphicon glyphicon-remove',
validating: 'glyphicon glyphicon-refresh'
},
excluded: [':disabled'],
fields: {

    
nick: {
message: 'The username is not valid',
validators: {
notEmpty: {
message: 'El nick es obligatorio y no puede estar vacio.'
},
stringLength: {
min: 4,
max: 12,
message: 'Minimo 4 caracteres y Maximo 12 '
},
regexp: {
regexp: /^[a-zA-Z0-9_\.]+$/,
message: 'No se permiten espacios'
}
}
},



}
})
.on('success.form.bv', function(e) {
e.preventDefault();
var f = $(this);
var formData = new FormData(document.getElementById("formulariouser"));
formData.append("dato", "valor");
$.ajax({
url: "../../model/users/index.php",
type: "post",
dataType: "html",
data: formData,
cache: false,
contentType: false,
processData: false
})
.done(function(res){
$('#modaluser').modal('hide')
readRecords();
$('#formulariouser')[0].reset();
$('#formulariouser').bootstrapValidator("resetForm",true); 
});
});
$('#modaluser')
.on('shown.bs.modal', function () {
$('#formulariouser').find('[name="nick"]').focus();
})
});