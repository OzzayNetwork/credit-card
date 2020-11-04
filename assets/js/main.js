$(document).ready(function(){
    $('.flatpickr-input').flatpickr({

        altInput: true,
        altFormat: "F j",
        dateFormat: "Y-m-d",
    });

    checkForImage();

    function checkForImage(){
        $('.form-body .control-buttons img').each(function(){
      
            var the_img=$(this).attr('src');
         //    alert(the_img);
            if(the_img!=="#"){
                $(this).parent().addClass('no-img-bg');
     
            }
            if(the_img==="#"){
             $(this).parent().removeClass('no-img-bg');
         }
     
         });
    }

    $('.control-buttons span').on('click', function(){
        $(this).addClass('selected');
        $(this).parent().siblings().children('span').removeClass('selected');
        var newUrl=$(this).children('img').attr('src');
        if(newUrl!=="#"){
            $('.upload-img-cont img').attr('src',newUrl);
            $('.upload-img-cont h6').addClass('d-none');
            $('.activation-form-container .upload-img-cont').addClass('no-img-bg');

        }
        else{
            $('.upload-img-cont img').attr('src','#');
            $('.upload-img-cont h6').removeClass('d-none');
            $('.activation-form-container .upload-img-cont').removeClass('no-img-bg');

        }

    });

    $('.logo-input').on('change', function(){
        var theId=$(this).attr("id");
        var theInput;
        var lastCharacter=theId[theId.length-1];
        theInput="input"+lastCharacter;

        file_changed(theId,theInput);
    });

    function file_changed(theId,theInput){
      
        var selectedFile = document.getElementById(theId).files[0];
        var img = document.getElementById('selected-image');
        var img2 = document.getElementById(theInput); 
        $('.upload-img-cont h6').addClass('d-none');
        $('#'+theInput).parent().addClass('no-img-bg');

       

        $('.activation-form-container .upload-img-cont').addClass('no-img-bg');
       
        // var img = document.getElementsByClassName(theId);
      
        var reader = new FileReader();
        reader.onload = function(){
           img.src = this.result;
           img2.src=this.result;
          
        }

      
        reader.readAsDataURL(selectedFile);
        
       }

       $('.form-links .nav li').on('click', function(){
           $(this).children('a').addClass('active');
           $(this).siblings().children('a').removeClass('active');
           var theIndex=$(this).index();

           var thisIndex=theIndex;
           var theIndex=theIndex+1;
           var theClass=".slider-container"+theIndex;
           $(theClass).removeClass('d-none').siblings().addClass('d-none');

           var theLast=$('.form-links .nav li').last().index();
           
            if(theLast==thisIndex){
               $('.billDetailsButton').attr('disabled','disabled');
            }
            else{
                $('.billDetailsButton').removeAttr('disabled');

            }
           
           
       });

       $('.form-btns .btn-next').on('click', function(){
           var theParent=$(this).parent().parent().parent().parent().parent()
            theParent.addClass("d-none");
            theParent.next().removeClass("d-none");
            var theParentIndex=theParent.index();
            $('.form-links .nav li a').removeClass('active');
            $('.form-links .nav li').eq(theParentIndex+1).children('a').addClass('active');

            var theLast=$('.form-links .nav li').last().index();

           
           
       });

       $('.form-btns .btn-prev').on('click', function(){
        var theParent=$(this).parent().parent().parent().parent().parent()
         theParent.addClass("d-none");
         theParent.prev().removeClass("d-none");
         var theParentIndex=theParent.index();
         $('.form-links .nav li a').removeClass('active');
         $('.form-links .nav li').eq(theParentIndex-1).children('a').addClass('active');
        
    });

    $('.form-btns .btn-back').on('click', function(){
        var theParent=$(this).parent().parent().parent().parent().parent();
        theParent.addClass("d-none");
      
        theParent.siblings().eq(0).removeClass('d-none');

        $('.form-links .nav li a').removeClass('active');
         $('.form-links .nav li').eq(0).children('a').addClass('active');

         $('.billDetailsButton').removeAttr('disabled');

         
        

    });
    

    //execute when form is being submitted
    $('.card-form').on('submit', function(e){
        e.preventDefault();        
        $('.card-loader').removeClass('d-none');

        //opens confirmation page after transaction was succesful
        
        setTimeout(function(){ window.open ('confirmation.html','_self',false); }, 5000);


        
    })

    // input masking
    jQuery('.credit-card').maskx({maskx:'cc'});

    

    // dynamically updating the years
    var option = $('<option></option>').attr("value", "option value").text("Text");
    $("#cardYear").empty().append(option);

    var thisYear=String(moment().format('YYYY'));
    thisYear=parseInt(thisYear);
    var newOptions

   
    //creating years objects
    var newOptions = {
       
    };

    //dynamically updating the years object
    for(i=0; i<7;i++){
        newOptions[thisYear+i]=thisYear;
    }
    

    var $el = $("#cardYear");
        $el.empty(); // remove old options
        $.each(newOptions, function(key,value) {
        $el.append($("<option></option>")
        .attr("value", value).text(key));
    });

    

    $(function() {
        $('#cardYear').change( function() {
            var value = $(this).val();
            
        });
    });

    // checking card number function

    $('#cardNum').on('keyup', function(){
        var cardNum=$(this).val();
        var theBrand=cc_brand_id(cardNum);

        console.log(theBrand);

        if(theBrand=="jcb"){
            $("#jcb").removeClass('d-none').siblings().addClass('d-none');
        }
        else if(theBrand=="amex"){
            $("#amex").removeClass('d-none').siblings().addClass('d-none');
        }

        else if(theBrand=="diners_club"){
            $("#dinnersClub").removeClass('d-none').siblings().addClass('d-none');
        }
        else if(theBrand=="visa"){
            $("#visa").removeClass('d-none').siblings().addClass('d-none');
        }
        else if(theBrand=="mastercard"){
            $("#mastercard").removeClass('d-none').siblings().addClass('d-none');
        }
        else if(theBrand=="maestro"){
            $("#maestro").removeClass('d-none').siblings().addClass('d-none');
        }

        else if(theBrand=="unknown"){
            $("#selected-image").removeClass('d-none').siblings().addClass('d-none');
        }
        else{
            console.log("something not working");
        }


    })
    
    function cc_brand_id(cur_val) {
    var sel_brand;
    
    // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
    // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also
    
    //JCB
    jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
    // American Express
    amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    // Diners Club
    diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
    // Visa
    visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    // MasterCard
    mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
    //Discover
    discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');
    ////6011, 622126-622925, 644-649, 65
    
    
    // get rid of anything but numbers
    cur_val = cur_val.replace(/\D/g, '');
    
    // checks per each, as their could be multiple hits
    //fix: ordering matter in detection, otherwise can give false results in rare cases
    if (cur_val.match(jcb_regex)) {
        sel_brand = "jcb";
    } else if (cur_val.match(amex_regex)) {
        sel_brand = "amex";
    } else if (cur_val.match(diners_regex)) {
        sel_brand = "diners_club";
    } else if (cur_val.match(visa_regex)) {
        sel_brand = "visa";
    } else if (cur_val.match(mastercard_regex)) {
        sel_brand = "mastercard";
    } else if (cur_val.match(discover_regex)) {
        sel_brand = "discover";
    } else if (cur_val.match(maestro_regex)) {
        if (cur_val[0] == '5') { //started 5 must be mastercard
        sel_brand = "mastercard";
        } else {
        sel_brand = "maestro"; //maestro is all 60-69 which is not something else, thats why this condition in the end
        }
    } else {
        sel_brand = "unknown";
    }
    
    return sel_brand;
    }



});