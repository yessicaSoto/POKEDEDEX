/*
 Utiliza el componente de data tables ja 
 */
jQuery.Tablas = {
    Idioma: {
        "lengthMenu": 'Mostrar _MENU_ registros por página',
        "zeroRecords": 'No se encontro información',
        "info": 'Mostrando página _PAGE_ de _PAGES_ de _TOTAL_ registros',
        "infoEmpty": '',
        "infoFiltered": '',
        "search": 'Buscar',
        "paginate": {
            "first": 'Primera',
            "last": 'Ultima',
            "next": 'Siguiente',
            "previous": 'Anterior',
        },
        "emptyTable": 'No se encontro información',
        "loadingRecords": 'Cargando...',
    },
    TablaAjax: function (_idTable, _url, _method, _columns) {
        var self = this;
        $("#loader").css('display', 'block');
        $(_idTable).DataTable().clear().destroy();
        $(_idTable).dataTable({
            "processing": false,
            "ajax": {
                "url": _url,
                "type": _method,
                'async': true,
                "dataSrc": ""
            },
            "columns": _columns,
            "language": self.Idioma,
            "fnInitComplete": function (oSettings, json) {
                $("#loader").css('display', 'none');
            }
        });
    },
}