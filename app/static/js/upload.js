$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $("#btn-download").hide();
    $('#btn-try-again').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            //Read the file from the form and show it in the preview
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log("loading preview")
                $('#imagePreview').attr('src', e.target.result);
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    // function updatePreview(element) 

    //On upload, show the image and the predict button
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-get-result').show();
        $('#btn-upload').html("change file");
        console.log("changed");
        readURL(this);
    });


    //Error message handling for ajax requests
    let formatErrorMessage = (jqXHR, exception) => {

        if (jqXHR.status === 0) {
            return ('Not connected.\nPlease verify your network connection.');
        } else if (jqXHR.status == 404) {
            return ('The requested page was not found. [404]');
        } else if (jqXHR.status == 500) {
            return ('Internal Server Error [500].');
        } else if (exception === 'parsererror') {
            return ('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
            return ('Time out error.');
        } else if (exception === 'abort') {
            return ('Ajax request aborted.');
        } else {
            return ('Uncaught Error.\n' + jqXHR.responseText);
        }
    }

    // Make the request for the predictions with the form data and then show the results
    $('#btn-get-result').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make the request
        $.when($.ajax({
            type: 'POST',
            url: '/get_wordcloud',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: response => {
                console.log("success !");
            },
        })).then( response => {
            //On successful response get and display the result
            $('.loader').hide();
            $('#upload-file').hide();
            $('#btn-try-again').show();

            let wordcloud = "data:image/png;base64," + response['wordcloud'];

            // update preview with result 
            $("#imagePreview").attr('src', wordcloud);
            $('#imagePreview').fadeIn(600);

            // prepare download button
            id = Math.floor(Math.random() * 1e16);
            $("#btn-download").attr("download", "wordclouded_" + id + ".png");
            $("#btn-download").attr("href", wordcloud)
            $("#btn-download").show();


        }).fail( (xhr, err) => {
            //On failure, handle the error
            var response_title= $(xhr.response_text).filter('title').get(0);
            console.log(xhr);
            error_text = $(response_title).text() + "\n" + formatErrorMessage(xhr, err) 
            console.log("Error happened ! : \n" + $(response_title).text() + "\n" + formatErrorMessage(xhr, err) );

            // Update UI accordingly
            $('#result').hide();
            $('.loader').hide();
            $('#btn-get-result').show();
            
            // Show error message
            $('.error-message').html(error_text)
            $('.error-message').fadeIn(650);
            setTimeout(() => $('.error-message').fadeOut(300), 2000);
        });
    });

});