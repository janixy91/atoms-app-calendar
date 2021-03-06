## Molecule.Calendar
Es el elemento encargado de crear un calendario en vista mensual, dispone de métodos para establecer nuevas fechas asi como poder modificar los literales por idioma. Puedes incluir este elemento en los *Organism.Section*.

### Attributes
```
id                    : String [OPTIONAL]
days                  : Array[String] [OPTIONAL]
months                : Array[String] [OPTIONAL]
disable_previous_days : Boolean [OPTIONAL]
date                  : String [OPTIONAL]
```

Por defecto el calendario contiene literales en inglés, si quisieses cambiarlo a otro idioma únicamente debes establecerlos a la hora de crear la instancia de *Molecule.Calendar*:

```
attributes = {
    days                 : ["L", "M", "X", "J", "V", "S", "D"],
    date                 : "1980/04/10",
    disable_previous_days: true
};
calendar_instance = new Atoms.Molecule.Calendar(attributes);
```

### Methods
#### .date()
Este método sirve para establecer una nueva fecha en el calendario, esta deberá ir con tipo *Date* de *JavaScript*.

**Parameters**

```
date     : DateTime [DEFAULT = today]
```

**Example**

```
calendar_instance.date(new Date());
/*  Current month */

var april = new Date("2014/04/10");
calendar_instance.date(april);
/*  April 2014 */

calendar_instance.current;
/* Mon Apr 10 2014 00:00:00 GMT+0200 (CEST) */
```

### Events

#### onCalendarSelect
El método `select` se desplegará cuando se seleccione una fecha del mes actual.
