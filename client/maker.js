$(document).ready(function() {
  const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#foxMessage").animate({width:'toggle'},350);
  }

  const sendAjax = (action, data) => {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: (result, status, xhr) => {
        $("#foxMessage").animate({width:'hide'},350);

        window.location = result.redirect;
      },
      
      error: (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);

        handleError(messageObj.error);
      }
    });
  }

  $("#makeFoxSubmit").on("click", (e) => {
    e.preventDefault();
    
    $("#foxMessage").animate({width:'hide'},350);
    
    if($("#foxName").val() == '' || $("#foxFavPhrase").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#foxForm").attr("action"), $("#foxForm").serialize());

    return false;
  });
  
  $("#speachSubmit").on("click", (e) => {
    e.preventDefault();
    
    $("#foxMessage").animate({width:'hide'},350);
    
    if($("#speach").val() == '') {
      handleError("They have nothing to say.");
      return false;
    } else {
      let userIn = $("#speach").val();
      let favPhrase = $("#favPhrase").val();
      let myOut = userIn + " " + favPhrase;
      console.log(myOut);
      $("#outSpeach").html(myOut);
    }

    return false;
  });
});