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
           var theIndex=theIndex+1;
           var theClass=".slider-container"+theIndex;
           $(theClass).removeClass('d-none').siblings().addClass('d-none');
           
       });

       $('.form-btns .btn-next').on('click', function(){
           var theParent=$(this).parent().parent().parent().parent().parent()
            theParent.addClass("d-none");
            theParent.next().removeClass("d-none");
            var theParentIndex=theParent.index();
            $('.form-links .nav li a').removeClass('active');
            $('.form-links .nav li').eq(theParentIndex+1).children('a').addClass('active');
           
       });

       $('.form-btns .btn-prev').on('click', function(){
        var theParent=$(this).parent().parent().parent().parent().parent()
         theParent.addClass("d-none");
         theParent.prev().removeClass("d-none");
         var theParentIndex=theParent.index();
         $('.form-links .nav li a').removeClass('active');
         $('.form-links .nav li').eq(theParentIndex-1).children('a').addClass('active');
        
    });

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



});