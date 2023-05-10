  const prependOptionDom = (select,text) => {
    select.prepend(`<option value="">${text}</option>`);
  }

  const hideShowEleDom = () =>{
    if(showEleArr!= null){
      $.each(showEleArr,(i,d) =>{
        d.fadeIn(800).removeClass('d-none').show();
      })
    }
    
    if(hideEleArr != null){
      $.each(hideEleArr,(i,d) =>{
        d.hide().addClass('d-none');
      })
    }
  }

  const basicHideShowEleDom = () =>{
    if(showEleArr!= null){
      $.each(showEleArr,(i,d) =>{
        d.removeClass('d-none').show();
      })
    }
    
    if(hideEleArr != null){
      $.each(hideEleArr,(i,d) =>{
        d.hide().addClass('d-none');
      })
    }
  }

  const massageDom = () =>{
      showEleArr = [massageTableSection,shopOptions];
      hideEleArr = [massageSection];
      basicHideShowEleDom();
  }

  const addNewPositionDom = () => {
    let section = shoptypeSelect.val();
    console.log(section)
    if(section === "massage"){

        showEleArr = [sectionTitleH4,massageSection,uploadShopButton,massageTableSection,shopOptions];
        hideEleArr = [updateShopButton,updateTranslatedShopButton,translatedSection,otherSection,
          languageSelect,roomReviewTableSection,roomApproveTableSection,roomOption];
        hideShowEleDom();
        
        sectionTitleH4.text('Shop Information');

    } else if(section !== "massage" && section !== ''){
        
        showEleArr = [sectionTitleH4,otherSection,roomReviewTableSection,roomViewOption];
        hideEleArr = [updateShopButton,uploadShopButton,updateTranslatedShopButton,translatedSection,massageSection,
          massageTableSection,roomApproveTableSection,roomOption,shopOptions];
        hideShowEleDom();
        
        sectionTitleH4.text('Hotel Information');
    }else{
        showEleArr = [massageTableSection,shopOptions];
        hideEleArr = [translatedSection,massageSection,sectionTitleH4,otherSection,roomReviewTableSection,roomApproveTableSection,roomOption];
        hideShowEleDom();

        resetToDefaultViewHandler();
        const modalData = {
            message:'Please select a shop type!'
        }
        const title = 'Alert Message!!!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);

    }   
  }  

  const massageCloseSectiondDom = () => {
      showEleArr = [languageSelect];
      hideEleArr = [massageSection,sectionTitleH4];
      hideShowEleDom();
      shoptypeSelect.val('');
  }

  const closeTranslatedSectiondDom = () => {
    showEleArr = [languageSelect];
    hideEleArr = [translatedSection,sectionTitleH4];
    hideShowEleDom();
    shoptypeSelect.val('');
    languageSelect.val('');
  }

  const deleteCommissionDom = () => {    
      commissionTable.on("click", ".deleteCommissionBtn", function () {
          let id = $(this).attr("data-index");        
          $(this).closest("tr").remove(); // select the row and remove it
          commissionServicesArr.splice(id, 1);
          mustacheServicesArr.splice(id, 1);
      })
  }

  const addprevnextBtnDom = () =>{    
      paginationCont.prepend('<li class="page-item" onClick="prevButtonHandler(this)" id="previousPage"><a class="page-link text-tilt" role="button"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></li>');
      paginationCont.append('<li class="page-item" onClick="nextButtonHandler(this)" id="nextPage"><a class="page-link text-tilt" role="button"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>');
  }

  const addCurrentActiveDom = (element) =>{
      // remove active class from all pagination links
      // $('#pagination').find('li').removeClass('active');

      // add active class to clicked link
      $(element).parent().addClass('active');
  }
  const deleteShopTableRowDom = () => {    
      shopTable.on("click", '.deleteShopBtn', function () {
          let id = $(this).attr("data-index");        
          $(this).closest("tr").remove(); // select the row and remove it
      })
  }

  const inputMoneyFormatDom = element =>{
      element.on('input', function(e) {
          let value = e.target.value;
          value = value.replace(/\D/g, ''); // Remove all non-numeric characters
          value = value.replace(/^0+/, ''); // Remove leading zeros
          value = value.padStart(1, '0'); // Pad with zeros if necessary
          // value = value.replace(/(\d{1,2})$/, ',$1'); // Add comma as decimal separator
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          e.target.value = value;
      });
  } 

  const inputSetMaxLengthDom = (element,digit,maxNumber,minNumber) =>{
      element.on('input', function() {
      var inputValue = $(this).val().replace(/[^\d.-]/g, ''); // remove non-numeric characters
      var formattedValue = parseFloat(inputValue).toLocaleString('en-US', {maximumFractionDigits: digit}); // format with commas and 2 decimal places
      if (parseFloat(inputValue) > maxNumber || parseFloat(inputValue) < minNumber) {
          $(this).val(formattedValue.slice(0, -1)); // remove the last character if it exceeds the maximum
          return false; // prevent typing
      }
      $(this).val(formattedValue); // update the input value with the formatted value
      });
  }

  const inputFormatTelNumberDom = element => {
    element.on('input', function() {
      var tel = $(this).val();
      tel = tel.replace(/\D/g, ''); // Remove all non-digits
      tel = tel.substring(0, 11); // Limit to 10 digits
      var formattedTel;
  
      if (tel.length === 10 && tel.startsWith("02")) {
        formattedTel = tel.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3'); // Add dashes after the 2nd and 7th digits for 10-digit numbers starting with "02"
      } else if (tel.length >= 4 && tel.length < 8) {
        formattedTel = tel.replace(/(\d{3})(\d{1,3})/, '$1-$2'); // Add dash after the 3rd digit
      } else if (tel.length >= 8 && tel.length <= 10) {
        formattedTel = tel.replace(/(\d{3})(\d{2,3})(\d{1,4})/, '$1-$2-$3'); // Add dashes after the 3rd and 6th digits
      } else if (tel.length == 11) {
        formattedTel = tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // Add dashes after the 3rd and 7th digits for 11-digit numbers
      } else {
        formattedTel = tel;
      }
  
      $(this).val(formattedTel); // Update input value
    });
  }

  const inputTime24HFormatDom = timeInput => {
    timeInput.on('input keydown', function(event) {
      let time = this.value.replace(/[^0-9]/g, '');  
      
      if (event.keyCode === 8) {
        // Handle backspace key
        time = time.slice(0, -1);
      } else {
        if (time.length > 4) {
          time = time.slice(0, 4);
        }
        
        const hours = time.slice(0, 2);
        const minutes = time.slice(2, 4);
        
        if (hours > 23) {
          time = '23' + time.slice(2);
        }
        
        if (minutes > 59) {
          time = time.slice(0, 2) + '59';
        }
      }
      
      this.value = time.slice(0, 2) + ':' + time.slice(2);
    });
  }

  const clearInputsDom = () =>{
      // clear input fields
      languageSelect.attr('data-shopSelect','');
      msidoSelect.val('');
      for (var i = 0; i < formElements.length; i++) {
          if (formElements[i].type == 'text' || formElements[i].type == 'number' || formElements[i].type == 'time' || formElements[i].type == 'file') {
              formElements[i].value = '';
          } else if (formElements[i].type == 'checkbox' || formElements[i].type == 'radio') {
              formElements[i].checked = false;
          }
      }

      // clear textareas
      for (var i = 0; i < textareas.length; i++) {
      textareas[i].value = '';
      }

      // clear select elements
      // for (var i = 0; i < selects.length; i++) {
      //     selects[i].value = '';
      // }
  }

  const clearRoomInputsDom = () =>{
    // clear input fields
    roomLanguageSelect.attr('data-shopSelect','');
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type == 'text' || formElements[i].type == 'number' || formElements[i].type == 'time' || formElements[i].type == 'file') {
            formElements[i].value = '';
        } else if (formElements[i].type == 'checkbox' || formElements[i].type == 'radio') {
            formElements[i].checked = false;
        }
    }

    // clear textareas
    for (var i = 0; i < textareas.length; i++) {
    textareas[i].value = '';
    }

    // clear select elements
    // for (var i = 0; i < selects.length; i++) {
    //     selects[i].value = '';
    // }
}

  const clearTranslatedFormDom = () =>{
      tlTitle.val("")
      tlSubtitle.val("")
      tlAddress.val("")
      tlMemo.val("")
  }

  const displayPreviewDom = (element) => {
      const src = element.getAttribute('data-src');
      previewDiv.attr('src',src);
  }

  const resetPreviewDom = () =>{
      const src = './vendors/imgs/preview-default.svg';
      previewDiv.attr('src',src);
  }

  const setPreviewToDefaultDom = () =>{
      
  }

  const setActivePageDom = () =>{    
      $('#page'+pageNum).removeClass('link-opacity-25');
      $('#page'+pageNum).addClass('link-opacity-100');
  }

  const showNewLanguageSelectDOM = ()=>{
      uploadTranslatedButton.fadeOut().addClass('d-none');
      updateTranslatedShopButton.fadeOut().addClass('d-none');
      uploadShopButton.fadeIn().removeClass('d-none');
      languageSelect.removeClass('d-none');
      massageSection.fadeIn().slideDown().removeClass('d-none');
  }

  const showUpdateShopDetailsDOM = ()=>{

      showEleArr = [updateShopButton,languageSelect,massageSection,sectionTitleH4];
      hideEleArr = [uploadTranslatedButton,updateTranslatedShopButton,uploadShopButton,translatedSection,otherSection];
      hideShowEleDom();

      sectionTitleH4.text('Shop Information');
  }

  const showUpdateTranslatedButtonDOM = ()=>{
      showEleArr = [updateTranslatedShopButton,translatedSection,languageSelect,sectionTitleH4];
      hideEleArr = [uploadTranslatedButton,uploadShopButton,massageSection,otherSection];
      hideShowEleDom();

      sectionTitleH4.text('Shop Update Translated Information');
  }

  const showNewTranslatedButtonDOM = ()=>{
      showEleArr = [uploadTranslatedButton,languageSelect,translatedSection,sectionTitleH4];
      hideEleArr = [updateTranslatedShopButton,uploadShopButton,massageSection,otherSection];
      hideShowEleDom();

      sectionTitleH4.text('Shop New Translated Information');
  }

  // const phoneFormatterDom = phoneInput => {
  //     phoneInput.on('input', event => {
  //       const phoneNumber = event.target.val().replace(/\D/g, ''); // remove non-numeric characters
  //       let formattedNumber = '';
  //       if (/^010\d{7}$/.test(phoneNumber)) { // 11-digit mobile phone number
  //         formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  //       } else if (/^02\d{8}$/.test(phoneNumber)) { // 10-digit Seoul phone number
  //         formattedNumber = phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  //       } else if (/^010\d{6}$/.test(phoneNumber)) { // 10-digit mobile phone number
  //         formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  //       } else if (/^031\d{7}$/.test(phoneNumber)) { // 10-digit phone number outside of Seoul
  //         formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  //       } else if (/^1688\d{4}$/.test(phoneNumber)) { // 8-digit business number
  //         formattedNumber = phoneNumber.replace(/(\d{4})(\d{4})/, '$1-$2');
  //       } else {
  //         formattedNumber = phoneNumber; // no formatting for invalid phone numbers
  //       }
  //       event.target.val() = formattedNumber;
  //     });
  //   };

  const getCheckBoxDom = (element) =>{
      shopCheckBox.each(function() {
      const selectedId = $(this).attr('data-id');
      
      console.log(`Selected ID: ${selectedId}`);
      // do something with the selected ID, such as sending an AJAX request to delete the corresponding item
    });
  }
  const toggleCheckBoxDom = (element) => {
    // const stat = $(element).prop('checked');
    //   const checkboxes = $('input.shopCheckBox');
    //   const index = checkboxes.index(element);
    //   if(stat === true){
    //     console.log('add to array');
    //     console.log(`Selected Index: ${index}`);
    //   }else{
    //     console.log('remove');
    //     console.log(`Selected Index: ${index}`);
    //   }
    const checkboxes = document.querySelectorAll('.data-checkbox:checked');
    var id = element.getAttribute('data-id');
    if (element.checked && !idArr.includes(id)) {
      idArr.push(id);
    } else if (!element.checked && idArr.includes(id)) {
      idArr.splice(idArr.indexOf(id), 1);
      selectAllCheckBox.checked = false;
    }
    // Check the "Select All" checkbox if all checkboxes are checked
    if (checkboxes.length === checkboxes.length) {
      selectAllCheckBox.checked = true;
    }

    console.log('selectId',idArr)
  }
  const selectAllDom = (element) =>{  
    const checkboxes = document.querySelectorAll('.data-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = element.checked;
      var id = checkboxes[i].getAttribute('data-id');
      if (element.checked && !idArr.includes(id)) {
        idArr.push(id);
      } else if (!element.checked && idArr.includes(id)) {
        idArr.splice(idArr.indexOf(id), 1);
      }
    }
  }
  const formatTimeDom = element => {
    element.on('input', (event) => {
        const timeValue = event.target.value;
        const formattedTimeValue = formatTime(timeValue);
        event.target.value = formattedTimeValue;
      });
      
      function formatTime(timeValue) {
        const date = new Date();
        const [hours, minutes] = timeValue.split(':');
        date.setHours(hours, minutes);
        let formattedHours = date.getHours() % 4 || 4; // display hours ranging from 1 to 4
        let formattedMinutes = Math.floor(date.getMinutes() / 10) * 10; // display minutes in increments of 10
        return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes.toString().padStart(2, '0')}`;
      }
  }
  const timePickerDom = () =>{
    $('.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '10',
        maxTime: '6:00pm',
        defaultTime: '11',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
  }

  const validateInputsDom = (container) =>{
    // Get all input, textarea, checkbox, and select elements within the container
    const inputs = container.querySelectorAll('input, textarea, select');

    // Create a variable to keep track of whether all inputs are valid or not
    let allValid = true;

    // Loop through the input elements and validate each one based on its type
    inputs.forEach(input => {
      switch (input.type) {
        case 'text':
          if (input.value.trim() === '') {
            console.error('Input is empty');
            allValid = false;
          }
          break;
        case 'hidden':
            if (input.value.trim() === '') {
              console.error('Input is empty');
              allValid = false;
            }
            break;
        case 'file':
            if (input.value.trim() === '') {
              console.error('Input is empty');
              allValid = false;
            }
            break;
        case 'textarea':
          if (input.value.trim() === '') {
            console.error('Input is empty');
            allValid = false;
          }
          break;
        case 'number':
          if (typeof input.value === 'undefined' || isNaN(input.value)) {
            console.error('Input is not a number');            
            allValid = false;
          }
          break;
        // case 'checkbox':
        //   if (typeof input.checked === 'undefined' || !input.checked) {
        //     console.error('Checkbox is not checked');
        //     allValid = false;
        //   }
        //   break;
        case 'select-one':
          if (typeof input.selectedIndex === 'undefined' || input.selectedIndex === 0) {
            console.error('No option is selected');
            allValid = false;
          }
          break;
        default:
          console.error('Unknown input type');
          allValid = false;
      }
    });

    // If all inputs are valid, execute the true statement
    if (allValid) {
      // return true;
      return true;
      // your code here...
    }else{
      return false;
    }
  }

  function makeGliderDom() {
    
  }
// $(document).ready(function(){
//   const mainImage = document.querySelector('.main-thumb img');
//     const thumbnails = document.querySelectorAll('.glider-img img');

//     const glider = new Glider(document.querySelector('.glider'), {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         itemWidth: undefined,
//         exactWidth: false,
//         duration: .5,
//         easing: function (x, t, b, c, d) {
//             return c * (t /= d) * t + b;
//         },
//         rewind: true,
//         arrows: {
//             prev: '.glider-prev',
//             next: '.glider-next'
//         },
//         responsive: [
//             {
//                 breakpoint: 900,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     itemWidth: undefined,
//                     exactWidth: false,
//                     duration: 0.25
//                 }
//             },
//             {
//                 breakpoint: 575,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 4,
//                     itemWidth: undefined,
//                     exactWidth: false,
//                     duration: 0.25
//                 }
//             }
//         ]
//     })

//     thumbnails.forEach((thumbnail, index) => {
//         thumbnail.addEventListener('click', function () {
//             const newImageSrc = this.getAttribute('src');
//             mainImage.setAttribute('src', newImageSrc);
//             glider.scrollItem(index);
//         });
//     });
// });
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 

  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })
});

// room dom
// display form if column is selected. use this variable roomForm
const reviewRoomDom = () =>{
  showEleArr = [roomReviewTableSection,approveRoomBtn,declineRoomBtn];
  hideEleArr = [roomApproveTableSection,updateRoomBtn,roomForm,roomOption];
  basicHideShowEleDom();
}
const editRoomDom = () =>{
  showEleArr = [otherSection, roomApproveTableSection, updateRoomBtn];
  hideEleArr = [roomReviewTableSection,approveRoomBtn,declineRoomBtn,roomForm];
  basicHideShowEleDom();
}
const showSelectedRoomReviewDom = () =>{
  showEleArr = [roomReviewTableSection,otherSection,roomForm,approveRoomBtn,declineRoomBtn];
  hideEleArr = [roomApproveTableSection,updateRoomBtn,roomOption];
  basicHideShowEleDom();
}
const showSelectedRoomEditDom = () =>{
  showEleArr = [roomApproveTableSection,otherSection,roomForm,updateRoomBtn,roomOption];
  hideEleArr = [roomReviewTableSection,approveRoomBtn,declineRoomBtn,translatedRoomSection];
  basicHideShowEleDom();
}
const showTranslatedRoomsDom = () =>{
  showEleArr = [updateTranslatedShopButton,translatedRoomSection,roomOption,sectionTitleH4];
  hideEleArr = [uploadTranslatedButton,uploadShopButton,massageSection,otherSection,roomForm,shopOptions];
  hideShowEleDom();

  sectionTitleH4.text('Hotel Translated Information');
}
const closeRoomTranslatedSectiondDom = () => {
  showEleArr = [otherSection, roomApproveTableSection, updateRoomBtn];
  hideEleArr = [roomReviewTableSection,approveRoomBtn,declineRoomBtn,roomForm,translatedRoomSection];
  basicHideShowEleDom();
  shoptypeSelect.val('');
}
const closeOtherSectiondDom = () => {
  showEleArr = [otherSection, roomApproveTableSection, updateRoomBtn];
  hideEleArr = [roomReviewTableSection,approveRoomBtn,declineRoomBtn,roomForm];
  basicHideShowEleDom();
  shoptypeSelect.val('');
}
const deleteRoomTableRowDom = () => {    
  approveTable.on("click", '.deleteRoomBtn', function () {
      let id = $(this).attr("data-index"); 
      console.log(id)       
      $(this).closest("tr").remove(); // select the row and remove it
  })
}
