var tabla;

//Función que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();
	guardaryeditar();	
	
}

//Función limpiar
function limpiar()
{
	$("#nombre").val("");
	$("#descripcion").val("");
	$("#idcategoria").val("");
}



//Función mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
		// RESET AND INITIALICE
		$('#formulario').find('[name="nombre"]').focus();
		$('#formulario')[0].reset();
        $('#formulario').bootstrapValidator("resetForm",true); 
        // END
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//Función cancelarform
function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//Función Listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [		          
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: '../ajax/categoria.php?op=listar',
					type : "get",
					dataType : "json",						
					error: function(e){
						console.log(e.responseText);	
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5,//Paginación
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
	}).DataTable();
}


//Función para guardar o editar
function guardaryeditar(e)
{

// VALIDATION FORMULARIO
$('#formulario') .bootstrapValidator({
	message: 'This value is not valid',
	feedbackIcons: {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	},
	excluded: [':disabled'],
	fields: {
		nombre: {
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
// ---------------------------------------SAVE

	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/categoria.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {                    
	          bootbox.alert(datos);	          
	          mostrarform(false);
	          tabla.ajax.reload();

	    }

	});
	// END--------------SAVE
	});
	limpiar();



	
}

function mostrar(idcategoria)
{
	$.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria}, function(data, status)
	{
		data = JSON.parse(data);		
		mostrarform(true);

		$("#nombre").val(data.nombre);
		$("#descripcion").val(data.descripcion);
 		$("#idcategoria").val(data.idcategoria);

 	})
}

//Función para desactivar registros
function desactivar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de desactivar la Categoría?", function(result){
		if(result)
        {
        	$.post("../ajax/categoria.php?op=desactivar", {idcategoria : idcategoria}, function(e){
        		bootbox.alert(e);
	            tabla.ajax.reload();
        	});	
        }
	})
}

//Función para activar registros
function activar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de activar la Categoría?", function(result){
		if(result)
        {
        	$.post("../ajax/categoria.php?op=activar", {idcategoria : idcategoria}, function(e){
        		bootbox.alert(e);
	            tabla.ajax.reload();
        	});	
        }
	})
}

// Funcion para eliminar registros
function eliminar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de que quiere eliminar la categoria?", function(result){
		if(result)
        {
        	$.post("../ajax/categoria.php?op=eliminar", {idcategoria : idcategoria}, function(e){
        		bootbox.alert(e);
	            tabla.ajax.reload();
        	});	
        }
	})
}






init();