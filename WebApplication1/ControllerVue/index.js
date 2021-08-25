const app = new Vue({
    el: '#app',

    data: {
        pokedex: [{
                nombre: '',
                tipos: '',
                habilidades: '',
                habilidad_oculta: '',
                peso: '',
                altura: '',
                exp_base: '',
            foto: '',
                id: '',
        }],
        Pokemon : {
            nombre: '',
            tipos: '',
            habilidades: '',
            habilidad_oculta: '',
            peso: '',
            altura: '',
            exp_base: '',
            foto: ''
        },
        listado: [],
    },
    methods: {

        buscar: function () {
           // event.preventDefault();
            var self = this;
                $("#loader").css('display', 'block');
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then(response => {
                $("#loader").css('display', 'none');
                self.listado = response.data.results;
                this.datosPkm(self.listado);
                }).catch(function (error) {
                    $("#loader").css('display', 'none');
                   // self.mensajeError(error);
                });
        },
        datosPkm: function (listado) {
            $("#loader").css('display', 'block');
            var self = this;
            var arreglo = [];
            for (var i = 0; i < listado.length; i++) {
                var url = listado[i].url;
                axios.get(url).then(response => {
                    var datos = response.data;
                    var Pokemon = {
                        nombre: '',
                        tipos: '',
                        habilidades: '',
                        habilidad_oculta: '',
                        peso: '',
                        altura: '',
                        exp_base: '',
                        foto: ''
                    };
                    var habilidades = datos.abilities;
                    var tipos = datos.types;
                    var habilidad = '';
                    var habilidadOculta = '';
                    var tipo = '';
                    var img = '';
                    for (var h = 0; h < habilidades.length; h++){
                        if (habilidades[h].is_hidden) {
                            habilidadOculta = habilidades[h].ability.name;
                        } else {
                            habilidad += habilidades[h].ability.name + ", ";
                        }
                       
                    }
                    for (var t = 0; t < tipos.length; t++) {
                        tipo += tipos[t].type.name + ", ";

                    }
                    debugger;
                    if (datos.id < 10) {

                        img = "00" + datos.id + ".png";
                    }
                    else {
                        if (datos.id < 100) {

                            img = "" + "0" + datos.id + ".png";
                        }
                        else {
                            img = datos.id + ".png";
                        }
                    }

                    //switch (tipos[0].type.name) {
                    //    case "Normal":
                    //        break;
                    //   case "Fighting":
                    //        break;
                    //   case "Flying":
                    //        break;
                    //   case "Poison":
                    //        break;
                    //   case "Ground":
                    //        break;
                    //   case "Bug":
                    //        break;
                    //   case "Steel":
                    //        break;
                    //   case "Fire":
                    //        break;
                    //   case "Water":
                    //        break;
                    //   case "Grass":
                    //        break;
                    //   case "Electric":
                    //        break;
                    //   case "Psychic":
                    //        break;
                    //   case "Ice":
                    //        break;
                    //   case "Dragon":
                    //        break;
                    //   case "Dark":
                    //        break;
                    //   case "Fairy":
                    //        break;
                    //}    		
                    	
                   
                    Pokemon.nombre = datos.name.toUpperCase();
                    Pokemon.peso = datos.weight + " KG";
                    Pokemon.altura = datos.height + " CM";
                    Pokemon.exp_base = datos.base_experience;
                    Pokemon.habilidades = habilidad.trim().slice(0, -1); 
                    Pokemon.habilidad_oculta = habilidadOculta;
                    Pokemon.tipos = tipo.trim().slice(0, -1);
                    Pokemon.foto = img;
                    debugger;
                    arreglo.push(Pokemon);

                    
                    $("#loader").css('display', 'none');
                }).catch(function (error) {
                    $("#loader").css('display', 'none');
                    // self.mensajeError(error);
                    });
                self.pokedex = arreglo;
            }
           
        },
        mensajeError: function (mensaje) {
            $("body").overhang({
                type: "error",
                message: mensaje,
                closeConfirm: true
            });
        },

    },
    mounted: function () {

        this.buscar();
    }
})
