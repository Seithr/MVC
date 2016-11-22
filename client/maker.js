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
    
    if($("#foxName").val() == '' || $("#foxAge").val() == '' || $("#foxFavPhrase").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#foxForm").attr("action"), $("#foxForm").serialize());

    return false;
  });
});