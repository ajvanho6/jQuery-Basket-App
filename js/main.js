var fields = [{
    input: $('#qty'),
    row: $('#one'),
    price: 1.99,
    item: document.getElementById('cotton'),
    span: $('.staticOne'),
    defaultText: 1,
    remove: $('.removeOne'),
    plus: $('.qtyPlus'),
    minus: $('.qtyMinus'),

  },

  {
    input: $('#qtyTwo'),
    row: $('#two'),
    price: 2.99,
    item: document.getElementById('baseball'),
    span: $('.staticTwo'),
    defaultText: 2,
    remove: $('.removeTwo'),
    plus: $('.qtyTwoplus'),
    minus: $('.qtyTwominus'),
  },

  {
    input: $('#qtyThree'),
    price: 3.99,
    row: $('#three'),
    item: document.getElementById('shorts'),
    span: $('.staticThree'),
    defaultText: 1,
    remove: $('.removeThree'),
    plus: $('.qtyThreeplus'),
    minus: $('.qtyThreeminus'),
  }
];


var sum = {
  rows: $('.repeat'),
  subtotal: document.getElementById('subtotal'),
  vat: document.getElementById('vat'),
  total: document.getElementById('total'),
}


var methods = (function() {
  return {

    add: function(field) {
      var max = 11;
      var num = Number($(field).val()) + 1;
      if (num >= max) {
        return;
      } else {
        $(field).val(num);
      }
    },


    clearPrice: function(elem, newvalue) {
      $(elem).val(newvalue);
    },


    remove: function(field) {
      var min = -1
      var num = Number($(field).val()) - 1;
      if (num <= min) {
        return;
      } else {
        $(field).val(num);
      }
    },

    subTotal: function() {
      var test = parseFloat($('#cotton').val()) || 0;
      var shorts = parseFloat($('#shorts').val()) || 0;
      var baseball = parseFloat($('#baseball').val()) || 0;
      var subtotal = test + shorts + baseball;

      subtotal = parseFloat(subtotal.toFixed(2));
      var vat = Number(((20 / 100) * subtotal));
      vat = parseFloat(vat.toFixed(2));
      var total = subtotal + vat;
      total = parseFloat(total).toFixed(2);

      sum.subtotal.value = subtotal;
      sum.vat.value = vat;
      sum.total.value = total;

    }
  }
}());



$(document).ready(function() {


  $.each(fields, function(index, obj) {
    $(obj.span).html('&pound;' + obj.price);
  });

  //hover table rows

  $('#one, #two, #three').hover(function() {
    $(this).addClass('hovered');
  }, function() {
    $(this).removeClass('hovered');
  });

  //Click buttons functions


  $.each(fields, function(index, obj) {

    $(obj.remove).click(function() {
      $(obj.row).remove();
      methods.subTotal();
      //test();
    });
  });


  //calculate price on button cliks

  $.each(fields, function(index, obj) {
    $(obj.plus).click(function(e) {
      var max = Number(obj.input.val());
      //console.log(max);
      var itemVal = parseFloat($(obj.item).val());
      //console.log(itemVal);
      if (max < 10) {
        var added = (itemVal + obj.price).toFixed(2);
        $(obj.item).val(added);
        methods.subTotal();
      }
      methods.add(obj.input);
    });
  });


  $.each(fields, function(index, obj) {
    $(obj.minus).click(function() {
      var min = Number(obj.input.val());
      //console.log(min);
      var itemVal = parseFloat($(obj.item).val());
      //console.log(itemVal);
      if (min > 0) {
        var removed = (itemVal - obj.price).toFixed(2);
        //console.log(obj.input.value);
        $(obj.item).val(removed);
        methods.subTotal();
        //test();
      }
      methods.remove(obj.input);
    });
  });


  //Focus and blur states


  $.each(fields, function(index, obj) {
    $(obj.input).focus(function() {
      this.value = "";
      methods.clearPrice(obj.item, 0.00);
    });
  });


  $.each(fields, function(index, obj) {
    $(obj.input).blur(function() {
      var defaultText = (obj.defaultText);
      var defautPrice = obj.price;

      if ($(this).val() == '') {
        $(this).val(defaultText);
        $(obj.item).val(defautPrice);
      }

    });
  });


  //Key Board calls

  $.each(fields, function(index, obj) {
    $(obj.input).on("input", function() {
      var self = $(obj.input).val();
      var max = 11;
      var min = 0;
      if (self < max && self > min) {
        self = (self * obj.price).toFixed(2);
        //console.log(self);
      } else {
        var shortenedString = self.substr(0, (self.length - 1));
        if ($(obj.input).val() == 0) {
          shortenedString = 0.00;
        }
        $(obj.input).val(shortenedString);
        self = (shortenedString * obj.price).toFixed(2);
      }
      $(obj.item).val(self);
      methods.subTotal();
      //test();

    });
  });


  //Prevent copy paste to input

  var integer = $('integer');
  $(document).on("cut copy paste", integer, function(e) {
    e.preventDefault();
  });

  //Limit to Integers Input field

  $(".integer").keydown(function(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  //Submit

  $("#endCart").on('click', function() {

    if (sum.total.value == 0) {
      document.getElementById("#endCart").disabled = true;
    } else {
      var formData = JSON.stringify($("#formCart").serializeArray());
      alert(formData);
      $.ajax({
        type: "POST",
        url: "serverUrl",
        data: formData,
        success: function() {},
        dataType: "json",
        contentType: "application/json"
      });
    }
  });

}); //end document ready
