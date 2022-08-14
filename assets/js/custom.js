// Gallery image hover
$( ".img-wrapper" ).hover(
    function() {
      $(this).find(".img-overlay").animate({opacity: 1}, 600);
    }, function() {
      $(this).find(".img-overlay").animate({opacity: 0}, 600);
    }
  );

  // Lightbox
  var $overlay = $('<div id="overlay"></div>');
  var $image = $("<img>");
  var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
  var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
  var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

  // Add overlay
  $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
  $("#gallery").append($overlay);

  // Hide overlay on default
  $overlay.hide();

  // When an image is clicked
  $(".img-overlay").click(function(event) {
    // Prevents default behavior
    event.preventDefault();
    // Adds href attribute to variable
    var imageLocation = $(this).prev().attr("href");
    // Add the image src to $image
    $image.attr("src", imageLocation);
    // Fade in the overlay
    $overlay.fadeIn("slow");
  });

  // When the overlay is clicked
  $overlay.click(function() {
    // Fade out the overlay
    $(this).fadeOut("slow");
  });

  // When next button is clicked
  $nextButton.click(function(event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").next().find("img"));
    // All of the images in the gallery
    var $images = $("#image-gallery img");
    // If there is a next image
    if ($nextImg.length > 0) {
      // Fade in the next image
      $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    } else {
      // Otherwise fade in the first image
      $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
    }
    // Prevents overlay from being hidden
    event.stopPropagation();
  });
  // When previous button is clicked
  $prevButton.click(function(event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").prev().find("img"));
    // Fade in the next image
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    // Prevents overlay from being hidden
    event.stopPropagation();
  });
  // When the exit button is clicked
  $exitButton.click(function() {
    // Fade out the overlay
    $("#overlay").fadeOut("slow");
  });



  $(document).ready(function() {

    var form = $('#form'),
        txt_name = $('#txt_name'),
        txt_phone = $('#txt_phone'),
        txt_email = $('#txt_email'),
        txt_pincode = $('#txt_pincode'),
        txt_property_size = $('#txt_property_size'),
        txt_location = $('#txt_location'),
        txt_property_type = $('#txt_property_type'),
        txt_area = $('#txt_area'),
        info = $('#info'),
        loader = $('#loader'),
        submit = $("#submit");

    form.on('input', '#email, #subject, #message', function() {
      $(this).css('border-color', '');
      info.html('').slideUp();
    });

    submit.on('click', function(e) {
      info.html('All fields are mandatory...').css('color', 'red').slideDown();
      e.preventDefault();
      if(validate()) {
        info.html('');
        $.ajax({
          type: "POST",
          url: "mailer.php",
          data: form.serialize(),
          dataType: "json"
        }).done(function(data) {
          if(data.success) {
            email.val('');
            subject.val('');
            message.val('');
            info.html('You have Message sent!').css('color', 'green').slideDown();
          } else {
            info.html('Could not send mail! Sorry!').css('color', 'red').slideDown();
          }
        });
      }
    });

    function validate() {
      var valid = true;
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if($.trim(txt_name.val()) === "") {
        txt_name.css('border-color', 'red');
        valid = false;
      } else {
        txt_name.css('border-color', '');
      }
      if($.trim(txt_phone.val()) === "") {
        txt_phone.css('border-color', 'red');
        valid = false;
      } else {
        txt_phone.css('border-color', '');
      }
      if(!regex.test(txt_email.val())) {
        txt_email.css('border-color', 'red');
        valid = false;
      }else {
        txt_email.css('border-color', '');
      }
      if($.trim(txt_location.val()) === "") {
        txt_location.css('border-color', 'red');
        valid = false;
      } else {
        txt_location.css('border-color', '');
      }
      if($.trim(txt_pincode.val()) === "") {
        txt_pincode.css('border-color', 'red');
        valid = false;
      } else {
        txt_pincode.css('border-color', '');
      }
      if($.trim(txt_property_type.val()) === "") {
        txt_property_type.css('border-color', 'red');
        valid = false;
      } else {
        txt_property_type.css('border-color', '');
      }
      if($.trim(txt_property_size.val()) === "") {
        txt_property_size.css('border-color', 'red');
        valid = false;
      } else {
        txt_property_size.css('border-color', '');
      }
      if($.trim(txt_area.val()) === "") {
        txt_area.css('border-color', 'red');
        valid = false;
      } else {
        txt_area.css('border-color', '');
      }
      return valid;
    }

  });
