jQuery.variables = {
    url: '',
    config: { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } }
    //url: '/web/index.php/'
};

jQuery.TablasU = {
    metodo: "GET",
    columnas: [],
    FILTRO1: 0,
    FILTRO2: 0,
    FILTRO3: "",
    FILTRO4: "",
    RowSelected: -1,
    objetoSeleccionado: {},
    rowSeleccionado: {},
    tabla_basica: function (id, columnas, datos, funcionClick, clickRow) {
        
        //var context = contexto;
        var self = this;
        this.RowSelected = -1;
        $(id).dataTable().fnDestroy();
        $(id).DataTable({
            "ordering": false,
            "paging": false,
            "info": false,
            "searching": false,
            //se habilita el modo responsivo
            responsive: true,
            //se configura la llamada al servidor, se establece a que metodo hara la peticion
            data: datos,
            //se configuran los campos a mostrar en el grid [se deben llamar igual que las propiedades de la fuente de datos, sensible a mayusculas y minusculas] [ejm. "{ "data": "Nombre de la columna/propiedad" }"]
            fnCreatedRow: function (nRow, aData, iDataIndex) {

            },
            columns: columnas,
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se encontró información",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": '',//"No hay información disponible",
                "search": "Buscar",
                "paginate": {
                    "first": "Primera",
                    "last": "Ultima",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        });

        if (clickRow !== null && clickRow === true) {
            $(id + ' tbody').unbind('click', 'tr');
            $(id + ' tbody').on('click', 'tr', function (e) {
                /*$(self.RowSelected).toggleClass('active');
                self.RowSelected = $(this).toggleClass('active');*/
                self.rowSeleccionado = $(id).DataTable().rows($(this)).data()[0];
                funcionClick("row");
            });
        }
        //$(id + ' tbody').unbind('click','a');
        var handler = function () {
            self.objetoSeleccionado = $(id).DataTable().rows($(this).parents('tr')).data()[0];
            var opcion = $(this).attr('id');
            if (funcionClick !== null)
                funcionClick(opcion);
        };
        $(id + ' tbody').undelegate('a', 'click', null);
        //$(id + ' tbody').undelegate('a', 'click', handler);
        $(id + ' tbody').delegate('a', 'click', handler);
        /*$(id + ' tbody').on('click', 'a', function (e) {
            self.objetoSeleccionado = $(id).DataTable().rows($(this).parents('tr')).data()[0];
            var opcion = $(this).attr('id');
            funcionClick(opcion);
        });*/
    },
    tabla: function (id, url, columnas, funcionClick, actualizar, eliminar) {
        var self = this;
        var oTable = $(id).DataTable(
            {
                "dom": '<lf<t>ip>',
                responsive: true,
                paging: true,
                processing: true,
                bFilter: false,
                serverSide: true,
                bDestroy: true,
                bSort: false,
                info: true,
                pagingType: 'full_numbers',
                lengthMenu: [[10, 25, 50, 100],
                [10, 25, 50, 100]],
                sAjaxSource: url,
                tableTools: {
                    "sRowSelect": "single"
                },
                fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {//Clic al renglon
                },
                fnServerData: function (sSource, aoData, fnCallback, oSettings) {//Callback al servidor
                    oSettings.jqXHR = $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        type: 'POST',
                        url: sSource,
                        data: JSON.stringify({
                            _LIMITE: oSettings._iDisplayLength,
                            PAGINA: (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1),
                            CONTADOR: oSettings.oAjaxData.sEcho,
                            FILTRO1: self.FILTRO1,
                            FILTRO2: self.FILTRO2,
                            FILTRO3: self.FILTRO3,
                            FILTRO4: self.FILTRO4
                        }),
                        cache: false,
                        processData: false,
                        beforeSend: function (aa) {
                            $("body").unbind().addClass("loading");
                        },
                        success: function (result) {
                            var json = result;
                            var DataTablePagination = {
                                aaData: json.aaData,
                                iTotalRecords: json.iTotalRecords,
                                iTotalDisplayRecords: json.iTotalDisplayRecords,
                                CONTADOR: json.sEcho
                            };

                            fnCallback(DataTablePagination);
                        },
                        error: function (error) {
                            $("body").removeClass("loading");
                            console.log(error);
                        },
                        complete: function () {
                            $("body").removeClass("loading");
                            if (actualizar === false)
                                $(".editar").hide();
                            if (eliminar === false)
                                $(".eliminar").hide();
                        }
                    });
                },
                columns: columnas,
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "No se encontró información",
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": '',//"No hay información disponible",
                    "infoFiltered": '',
                    "search": "Buscar",
                    "paginate": {
                        "first": "Primera",
                        "last": "Ultima",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                },
                columnDefs: [{
                    "searchable": false,
                    "targets": -1,
                    "data": null,
                    "defaultContent": ""
                }],
                "fnInitComplete": function (oSettings, json) {
                    $("body").removeClass("loading");
                }
            });


        $(id + ' tbody').unbind('click');
        $(id + ' tbody').on('click', 'tr', function (e) {
            $(self.RowSelected).toggleClass('active');
            self.RowSelected = $(this).toggleClass('active');
        });

        var handler = function () {
            self.objetoSeleccionado = $(id).DataTable().rows($(this).parents('tr')).data()[0];
            var opcion = $(this).attr('id');
            funcionClick(opcion);
        };
        $(id + ' tbody').undelegate('a', 'click', null);
        //$(id + ' tbody').undelegate('a', 'click', handler);
        $(id + ' tbody').delegate('a', 'click', handler);
    },
    
};

/*Navegacion del sistema*/
jQuery.Navigation = {
        GoToPage: function () {
            $(".menu-option").on("click", function (e) {
                e.preventDefault();
                var ruta = $(this).attr("href");
                $("#body").load(ruta, function () {
                    //history.pushState(null, null, ruta);
                });
            });
        },
    GoToPageRedirect: function (_route) {
            $("#body").load(_route, function () { });
        },
    };