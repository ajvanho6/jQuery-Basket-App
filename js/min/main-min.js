function clearPrice(t,e){$(t).val(e)}function limitText(t,e){var n=$(t),i=n.val();i.length>=e&&n.val(function(){return console.log(i.substr(0,e)),i.substr(0,e)})}function add(t){var e=11,n=Number($(t).val())+1;n>=e||$(t).val(n)}function remove(t){var e=-1,n=Number($(t).val())-1;e>=n||$(t).val(n)}function subTotal(){var t=parseFloat($("#cotton").val()),e=parseFloat($("#shorts").val()),n=parseFloat($("#baseball").val());if(0==t)var i=e+n;else if(0==e)var i=t+n;else if(0==n)var i=t+e;else var i=t+e+n;var a=!$("#table").find(inputs.rowOne).length,u=!$("#table").find(inputs.rowTwo).length,o=!$("#table").find(inputs.rowThree).length;if(a)var i=n+e;else if(u)var i=t+e;else if(o)var i=n+t;if(a&&u)var i=e;if(a&&o)var i=n;if(u&&o)var i=t;if(a&&u&&o)var i=0;i=parseFloat(i.toFixed(2));var r=Number(.2*i);r=parseFloat(r.toFixed(2));var s=i+r;s=parseFloat(s).toFixed(2),inputs.subtotal.value=i,inputs.vat.value=r,inputs.total.value=s}var inputs={firstInput:$("#qty"),secondInput:$("#qtyTwo"),thirdInput:$("#qtyThree"),price:1.99,priceTwo:2.99,priceThree:3.99,itemOne:document.getElementById("cotton"),itemTwo:document.getElementById("baseball"),itemThree:document.getElementById("shorts"),rowOne:$("#one"),rowTwo:$("#two"),rowThree:$("#three"),subtotal:document.getElementById("subtotal"),vat:document.getElementById("vat"),total:document.getElementById("total"),button:$("#endCart")};$(document).ready(function(){$("#one, #two, #three").hover(function(){$(this).addClass("hovered")},function(){$(this).removeClass("hovered")});var t=$(".removeOne"),e=$(".removeTwo"),n=$(".removeThree");$(t).click(function(){$(inputs.rowOne).remove(),subTotal()}),$(e).click(function(){$(inputs.rowTwo).remove(),subTotal()}),$(n).click(function(){$(inputs.rowThree).remove(),subTotal()});var i=$(".qtyPlus"),a=$(".qtyMinus"),u=$(".qtyTwoplus"),o=$(".qtyTwominus"),r=$(".qtyThreeplus"),s=$(".qtyThreeminus");$(i).click(function(){var t=Number(inputs.firstInput.val()),e=parseFloat($("#cotton").val());10>t&&(inputs.itemOne.value=(e+inputs.price).toFixed(2),subTotal()),add(inputs.firstInput)}),$(a).click(function(){var t=Number(inputs.firstInput.val()),e=parseFloat($("#cotton").val());t>0&&(inputs.itemOne.value=(e-inputs.price).toFixed(2),subTotal()),remove(inputs.firstInput)}),$(u).click(function(){var t=Number(inputs.secondInput.val()),e=parseFloat($("#baseball").val());10>t&&(inputs.itemTwo.value=(e+inputs.priceTwo).toFixed(2),subTotal()),add(inputs.secondInput)}),$(o).click(function(){var t=Number(inputs.secondInput.val()),e=parseFloat($("#baseball").val());t>0&&(inputs.itemTwo.value=(e-inputs.priceTwo).toFixed(2),subTotal()),remove(inputs.secondInput)}),$(r).click(function(){var t=Number(inputs.thirdInput.val()),e=parseFloat($("#shorts").val());10>t&&(inputs.itemThree.value=(e+inputs.priceThree).toFixed(2),subTotal()),add(inputs.thirdInput)}),$(s).click(function(){var t=Number(inputs.thirdInput.val()),e=parseFloat($("#shorts").val());t>0&&(inputs.itemThree.value=(e-inputs.priceThree).toFixed(2),subTotal()),remove(inputs.thirdInput)}),$(inputs.firstInput).focus(function(){this.value="";var t=$("#cotton");clearPrice(t,0)}),$(inputs.firstInput).blur(function(){var t=1,e=1.99;if(""==$(this).val()){$(this).val(t);var n=$("#cotton");$(n).val(e)}}),$(inputs.secondInput).focus(function(){this.value="";var t=$("#baseball");clearPrice(t,0)}),$(inputs.secondInput).blur(function(){var t=2,e=5.98;if(""==$(this).val()){$(this).val(t);var n=$("#baseball");$(n).val(e)}}),$(inputs.thirdInput).focus(function(){this.value="";var t=$("#shorts");clearPrice(t,0)}),$(inputs.thirdInput).blur(function(){var t=1,e=3.99;if(""==$(this).val()){$(this).val(t);var n=$("#shorts");$(n).val(e)}}),$(inputs.firstInput).on("input",function(){var t=$(this).val(),e=11,n=0;if(e>t&&t>n)inputs.itemOne.value=(1.99*t).toFixed(2);else{var i=t.substr(0,t.length-1);inputs.itemOne.value=(1.99*i).toFixed(2)}}),$(inputs.secondInput).on("input",function(){var t=$(this).val(),e=11,n=0;if(e>t&&t>n)inputs.itemTwo.value=(2.99*t).toFixed(2);else{var i=t.substr(0,t.length-1);inputs.itemTwo.value=(2.99*i).toFixed(2)}}),$(inputs.thirdInput).on("input",function(){var t=$(this).val(),e=11,n=0;if(e>t&&t>n)inputs.itemThree.value=(3.99*t).toFixed(2);else{var i=t.substr(0,t.length-1);inputs.itemThree.value=(3.99*i).toFixed(2)}});var l=$("integer");$(document).on("cut copy paste",l,function(t){t.preventDefault()}),$(".integer").keydown(function(t){-1!==$.inArray(t.keyCode,[46,8,9,27,13,110,190])||65==t.keyCode&&(t.ctrlKey===!0||t.metaKey===!0)||t.keyCode>=35&&t.keyCode<=40||(t.shiftKey||t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()}),$("#endCart").on("click",function(t){t.preventDefault();var e=JSON.stringify($("#formCart").serializeArray());alert(e),$.ajax({type:"POST",url:"serverUrl",data:e,success:function(){},dataType:"json",contentType:"application/json"})})}),$("input.testinput").on("keyup",function(){limitText(this,2)});