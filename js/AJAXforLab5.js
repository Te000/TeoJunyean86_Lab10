    //Retrieving jSon data

    $(document).ready(function(){
   
    $.ajax({
    url: 'data/mr_burger_menu.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {

      //retrieving burger data
      {
        var newBurger = '';

      for (var i = 0; i < data.menu.burgerType.length; i++) {
        newBurger += '<option value="' + data.menu.burgerType[i].value + '">' + data.menu.burgerType[i].type + '</option>';
      }

      $('#burger').append(newBurger);
      }; 

      //retrieving bread data
      {
        var newBread = '';

      for (var i = 0; i < data.menu.breadType.length; i++) {
        newBread += '<option value="' + data.menu.breadType[i].value + '">' + data.menu.breadType[i].type + '</option>';
      }

      $('#bread').append(newBread);
      };

      //retrieving size data
      {
        var newSize = '';

        for(aaa in data.menu.burgerSize) {
          newSize += '<option value="' + aaa + '">' + data.menu.burgerSize[aaa] + '</option>';
        }
        $('#size').append(newSize);

      }

      //retrieving toppings data
       {
       var newToppings = '';

       for (var i = 1; i < data.menu.toppings.length; i++) {
        newToppings += '<input type="checkbox" class ="checkbox" value="' + data.menu.toppings[i].value + '"/>' + data.menu.toppings[i].topping;
      }

      $('#topping').append(newToppings);
      };

      
      //retrieving sauces data
      {
       var newSauces = '';

       for (var i = 0; i < data.menu.sauces.length; i++) {
        newSauces += '<input type="checkbox" class ="checkbox" value="' + data.menu.sauces[i].value + '"/>' + data.menu.sauces[i].sauce;
      }

      $('#sauce').append(newSauces);
      };
      
    },
    error: function(error) {
      alert(error);
    }
        });
});