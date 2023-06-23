// define the event handler function 
// handler functions
function selectPageHandler(element) {
    pageNum = element.getAttribute('data-pagenum');
    
    console.log('page_num:',pageNum);
    console.log('limit:',limit)
    const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
    asyncget(url, cb_massageTable);

    $(`#page${pageNum}`).addClass('current');
}
const prevButtonHandler = () => {
    if (pageNum > 1) {
        pageNum--;
        $("#pagination li").removeClass("link-opacity-25");
        $("#pagination li:nth-child(" + pageNum + ")").addClass("link-opacity-100");
      }
}
const nextButtonHandler = () => {
    var maxPage = $("#pagination li").length - 2;
    if (pageNum < maxPage) {
        pageNum++;
        $("#pagination li").removeClass("link-opacity-25");
        $("#pagination li:nth-child(" + pageNum + ")").addClass("link-opacity-100");
    }
}
const loadDefaultView = () =>{
    let section = shoptypeSelect.val();

    if(section === "massage"){
        loadMassageViewHandler();
    }else if(section !== "massage" && section !== ""){
        // load review list
        loadReviewRoomHandler();
    }else{
        
    }
}
const addNewPositionHandler = () =>{
    clearFormDataHandler();
    addNewPositionDom();
    loadReviewRoomHandler();
    // limit = defaultRowVal;
    // const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
    // asyncget(url, cb_massageTable);
    
}

function uploadShopHandler(){
    // stringWithoutComma = myString.replace(",", "");
    let salary = (msalary.val() === null || msalary.val() === '') ? 0 : parseInt(removeAllCommaVendor(msalary.val()));
    const shopData = { 
        "title" : mtitle.val(), 
        "subTitle" : msubtitle.val(), 
        "salary": salary, 
        "address":maddress.val(), 
        "holiday" : parseInt(mholiday.val()), 
        "endWorkingTime" : changeTimeFormat(mtimeEnd.val()), 
        "startWorkingTime" : changeTimeFormat(mtimeStart.val()), 
        "sidoCode" : msidoSelect.val(), 
        "payoutDate" : parseInt(mpayday.val()), 
        "isWorkingTimeNegotiable" : misWorkingTimeNegotiable.prop('checked'), 
        "isHolidayNegotiable" : misHolidayNegotialble.prop('checked'), 
        "isPayoutDateNegotiable":misPayoutDateNegotiable.prop('checked'),
        "average" : parseInt(maverage.val()) , 
        "startAge" : parseInt(mstartAge.val()), 
        "endAge" : parseInt(mendAge.val()), 
        "commissionId" : '', 
        "memo" : mmemo.val(), 
        "contact" : mphoneNumber.val(), 
        "lineId" : mlineId.val(), 
        "shopType" : 'massage', 
        "commissionDatePayout" : parseInt(mcommsalary.val()), 
        "roomType" : mroomtype.val(), 
        "shopServices" : commissionServicesArr
    }       
    console.log('shopData',shopData)
    console.log('commissionServicesArr',commissionServicesArr)
    const inputs =[ mthumbnail.val(), mfiles.val(), mtitle.val(),msubtitle.val(), maddress.val(), mholiday.val(),
        mtimeEnd.val(), mtimeStart.val(), msidoSelect.val(), mpayday.val(), maverage.val(), mstartAge.val(), mendAge.val(), mmemo.val(), 
        mphoneNumber.val(), mlineId.val(), mcommsalary.val(), mroomtype.val()];
    if(validateInputsHandler(inputs) !== false){
        uploadShop(filesEl,thumbnailEl,shopData);
    }else{
        // display modal here for error prompt
        const modalData = {
            message:'Some inputs are empty!'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
    
}

function loadMassageViewHandler(){    
    clearFormDataHandler();
    massageDom();
    limit = largeRowVal;
    pageNum = startpage;
    const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
    asyncget(url, cb_massageTable);

    const urlLang  = `http://210.99.223.38:13405/api/general/languages`;
    asyncget(urlLang, cb_languageData);

    const urlSido = `http://210.99.223.38:13405/api/general/sido`;
    asyncget(urlSido, cb_sidoCode);

    const urlShopType = `http://210.99.223.38:13405/api/general/shoptype`;
    asyncget(urlShopType, cb_shopType);
}
function resetToDefaultViewHandler(){
    console.log(limit,largeRowVal);
    if(limit !== largeRowVal){        
        const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${largeRowVal}`;
        asyncget(url, cb_massageTable);
    }    
}
function closeMassageFormHandler(){
    massageCloseSectiondDom();
    clearInputsDom();
    limit = largeRowVal;
    const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
    asyncget(url, cb_massageTable);
}
function closeOtherFormHandler(){
    closeOtherSectiondDom();
    // clearInputsDom
    limit = largeRowVal;
    const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
    asyncget(url, cb_massageTable);
}
function closeTranslatedFormHandler(){
    closeTranslatedSectiondDom();
    clearInputsDom();
    limit = largeRowVal;
    const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
    asyncget(url, cb_massageTable);
}

function editShopDetailHandler(element){
// parse data from shop details
    const id = element.getAttribute('data-id')
    const url  = `http://210.99.223.38:13405/api/shop/translatedInfo?languageCode=4&shopId=${id}`;
    asyncget(url, cb_shopDetails);
}
function updateStatusHandler(element){
    // parse data from shop details
    const status = element.getAttribute('data-status')
    let newStat = (status === "reviewing")? 'displaying' : 'reviewing'
    const id = element.getAttribute('data-id')
    const putStatus = `http://210.99.223.38:13405/api/shop/update/status?status=${newStat}`;
    let data = [id];
    updateStatusVendor(data,putStatus,element);
    
    // console.log('changeStat stat:',newStat)
    // console.log('changeStat id:',id)
    // console.log('put rl:',putStatus)
    // console.log('put rl:',JSON.stringify(data))
}

// need to debug reponse condition unable to run deleteShopTableRowDom(element)
function deleteShopHandler(element){
    // parse data from shop details
    const id = element.getAttribute('data-id')
    console.log('delete id:',id)
    const delUrl = `http://210.99.223.38:13405/api/shop/update/`
    let data = [id]
    deleteShopTableRowDom()
    deleteData(data, delUrl)
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.log("Request failed: " + error);
    });   
}

function selectLanguageTransHandler(element){
    clearFormDataHandler();    
    showUpdateTranslatedButtonDOM();
    const langName = element.getAttribute('data-language');
    const code = element.getAttribute('data-langid');
    const shopid = element.getAttribute('data-shopid');
    languageSelect.val(code);
    tlShopId.val(shopid);
    languageSelect.attr('data-shopselect',shopid);
    limit = defaultRowVal;
    const urlData  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
    asyncget(urlData, cb_massageTable);
    const url  = `http://210.99.223.38:13405/api/shop/translatedInfo?languageCode=${code}&shopId=${shopid}`;    
    console.log(url)
    asyncget(url, cb_shopDetails);

    
    console.log('language avail id:',langName);
    console.log('shop id:',shopid);
    console.log('langguage Arr:',code)
}

function addCommissionHandler(){
    addNewCommission();
    console.log(commissionServicesArr)
    deleteCommissionDom();
}

function deleteCommisionHandler(){
    //delete data from the array object
}

const selectLanguageListHandler = (element) =>{
    const code = $(element).val();
    const shopid = element.getAttribute('data-shopselect');
    console.log(shopid)
    if(!shopid){
        const modalData = {
            message:'Please select a shop.'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }else{
        limit = defaultRowVal;
        const urlData  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
        asyncget(urlData, cb_massageTable);
        const url  = `http://210.99.223.38:13405/api/shop/translatedInfo?languageCode=${code}&shopId=${shopid}`;    
        asyncget(url, cb_selectLanguageShop,cb_noLanguageTranslated);
    }
}

const columnSelectShopHandler = element =>{
    clearFormDataHandler();
    showUpdateShopDetailsDOM();
    const shopid = element.getAttribute('data-id');
    languageSelect.attr('data-shopselect',shopid);
    limit = defaultRowVal;
    const code = 0;
    mshopid.val(shopid);
    tlShopId.val(shopid); 
    languageSelect.val('0')
    const urlData  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
    asyncget(urlData, cb_massageTable);
    const url  = `http://210.99.223.38:13405/api/shop/translatedInfo?languageCode=${code}&shopId=${shopid}`;    
    console.log(url)
    asyncget(url, cb_selectedShopVendor);
    
    console.log('tr:',shopid)
}

const uploadTranslatedShopHandler = () =>{
    let id = languageSelect.val();
        id = parseInt(id);
    console.log('name',getLanguageNameVendor(id))
    console.log('code',id,"shopid",tlShopId.val())
    const shopData = { 
        "title" : tlTitle.val(), 
        "subTitle" : tlSubtitle.val(), 
        "shopLanguageId" : id,
        "shopId": tlShopId.val(),
        "address":tlAddress.val(),
        "memo" : tlMemo.val() 
    }    
    const url = "http://210.99.223.38:13405/api/shop/upload/translated";
    const inputs =[tlTitle.val(), tlSubtitle.val(), tlAddress.val(), tlMemo.val()]
    if(validateInputsHandler(inputs) !== false){
        uploadTranslated(shopData,url);
    }else{        
        const modalData = {
            message:'Some inputs are empty!'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
    
    console.log(shopData);
}

const updateTranslatedShopHandler = () =>{
    let id = parseInt(languageSelect.val());
    // let salary = tlSalary.val();
    //     salary = parseFloat(salary.replace(/,/g, ''))
    const shopData = { 
        "title" : tlTitle.val(), 
        "subTitle" : tlSubtitle.val(), 
        "shopLanguageId" : id,
        "shopId": tlShopId.val(),
        "address":tlAddress.val(),
        "memo" : tlMemo.val() 
    }    
    const url = "http://210.99.223.38:13405/api/shop/update/shop";
    const inputs =[tlTitle.val(), tlSubtitle.val(), tlAddress.val(), tlMemo.val()]
    if(validateTranslateInputsHandler(inputs) !== false){
        console.log('executing updates')
        updateTranslatedShopVendor(shopData,url);
    }else{
        const modalData = {
            message:'Some inputs are empty!'+inputs
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
    console.log(shopData);
}

const updateShopDetailsHandler = () =>{
    const shopData = { 
        "shopId": mshopid.val(),
        "shopLanguageId" : "0",
        "title" : mtitle.val(), 
        "subTitle" : msubtitle.val(), 
        "salary":parseInt(removeAllCommaVendor(msalary.val())), 
        "address":maddress.val(), 
        "holiday" : parseInt(mholiday.val()), 
        "endWorkingTime" : changeTimeFormat(mtimeEnd.val()), 
        "startWorkingTime" : changeTimeFormat(mtimeStart.val()), 
        "sidoCode" : msidoSelect.val(), 
        "payoutDate" : parseInt(mpayday.val()), 
        "isWorkingTimeNegotiable" : misWorkingTimeNegotiable.prop('checked'), 
        "isHolidayNegotiable" : misHolidayNegotialble.prop('checked'), 
        "isPayoutDateNegotiable":misPayoutDateNegotiable.prop('checked'),
        "average" : parseInt(maverage.val()) , 
        "startAge" : parseInt(mstartAge.val()), 
        "endAge" : parseInt(mendAge.val()), 
        "commissionId" : '', 
        "memo" : mmemo.val(), 
        "contact" : mphoneNumber.val(), 
        "lineId" : mlineId.val(), 
        "shopType" : 'massage', 
        "commissionDatePayout" : parseInt(mcommsalary.val()), 
        "roomType" : mroomtype.val(), 
        "shopServices" : commissionServicesArr
    }
    const putUrl = `http://210.99.223.38:13405/api/shop/update/shop`;
    const inputs =[msalary.val(), mtitle.val(),msubtitle.val(), maddress.val(), mholiday.val(),
        mtimeEnd.val(), mtimeStart.val(), msidoSelect.val(), mpayday.val(), maverage.val(), mstartAge.val(), mendAge.val(), mmemo.val(), 
        mphoneNumber.val(), mlineId.val(), mcommsalary.val(), mroomtype.val()];
    if(validateInputsHandler(inputs) !== false){
        updateShopDetailsVendor(shopData,putUrl);
    }else{
        // display modal here for error prompt
        const modalData = {
            message:'Some inputs are empty!'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
    console.log(shopData)
}

const formatInputHandler = () => {
    inputMoneyFormatDom(msalary);   
    inputMoneyFormatDom(serviceAmountInput); 
    inputMoneyFormatDom(tlSalary); 
     
    inputSetMaxLengthDom(mpayday,2,31,1);
    inputSetMaxLengthDom(mcommsalary,2,31,1);
    inputSetMaxLengthDom(holidayInput,2,31,1);
    inputSetMaxLengthDom(averageInput,2,31,1);
    inputSetMaxLengthDom(startAgeInput,2,100,1);
    inputSetMaxLengthDom(endAgeInput,2,100,1);
    inputFormatTelNumberDom(phoneNumberInput);
    inputTime24HFormatDom(mtimeStart);
    inputTime24HFormatDom(mtimeEnd);
    inputTime24HFormatDom(serviceTimeInput);
}

const clearFormDataHandler = () =>{
    clearInputsDom();
    resetPreviewDom();
    imagesArr.splice(0, imagesArr.length);
    commissionServicesArr.splice(0, commissionServicesArr.length);
    mustacheServicesArr.splice(0, mustacheServicesArr.length);
    sliderCont.empty();
    commissionCont.empty();
}

const multipleDeleteHandler = () =>{
    const delUrl = `http://210.99.223.38:13405/api/shop/update/`;
    
    if(validateMultipleSelectHandler() !== false){
        deleteMultipleShopVendor(idArr,delUrl);
    }else{
        const modalData = {
            message:'No Shop(s) Selected'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
}

const multipleChangeStatusHandler = (element) =>{
    const status = $(element).attr('data-type');
    const putStatus = `http://210.99.223.38:13405/api/shop/update/status?status=${status}`;
    
    if(validateMultipleSelectHandler() !== false){
        updateMultipleStatusVendor(idArr,putStatus);
    }else{
        const modalData = {
            message:'No Shop(s) Selected'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
}

const validateInputsHandler = (inputs) =>{    
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input === '' || input === ':' || input === null || commissionServicesArr.length === 0) {
        isValid = false;
        break; // Stop the loop if any input is invalid
        }
    }
    return isValid;
}


const validateTranslateInputsHandler = (inputs) =>{    
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input === '' || input === ':' || input === null) {
        isValid = false;
        break; // Stop the loop if any input is invalid
        }
    }
    return isValid;
}

const validateMultipleSelectHandler = () => {
    let isValid = true;
    if(idArr.length === 0){
        isValid = false;
    }

    return isValid;
}

// room handlers

const loginInputsHandler = (inputs) =>{
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input === '' || input === null) {
        isValid = false;
        break; // Stop the loop if any input is invalid
        }
    }
    return isValid;
}

const roomLoginHandler = () =>{
    const logininputs = [username.val(),password.val()];
    if(loginInputsHandler(logininputs) === true){
        let data = {
            username: username.val(),
            password: password.val()
        }
        apiLoginVendor(data);
    }else{
        // message error here
        const modalData = {
            message:'Some inputs are empty!'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }
}
const reviewRoomHandler = () =>{
    reviewRoomDom();
    loadReviewRoomHandler();
}

const editRoomHandler = () =>{
    editRoomDom();
    loadRoomListHandler();
}

const loadReviewRoomHandler = () =>{
    // load default view when hotel is selected
    const url  = '../assets/json/getroomlist.json';
    asyncget(url, cb_reviewRoomTable,errorCallbackVendor);
}

const loadRoomListHandler = () =>{
    const url  = '../assets/json/getroomlist.json';
    asyncget(url, cb_roomListTable,errorCallbackVendor);
    
}

// select language
const selectRoomLanguageHandler = (element) =>{
    const code = $(element).val();
    const shopid = element.getAttribute('data-shopselect');
    console.log(shopid)
    if(!shopid){
        const modalData = {
            message:'Please select a shop.'
        }
        const title = 'Alert Message!';
        globalmodal (title,modal);
        modalContainer.empty();
        mustacheTemplating(modalContainer,alertTemplate,modalData);
    }else{
        limit = defaultRowVal;
        const urlData  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
        // asyncget(urlData, cb_massageTable);
        const url  = `http://210.99.223.38:13405/api/shop/translatedInfo?languageCode=${code}&shopId=${shopid}`;    
        // asyncget(url, cb_selectLanguageShop,cb_noLanguageTranslated);
        showTranslatedRoomsDom();
        
    }
}

const clearRoomFormDataHandler = () =>{
    clearRoomInputsDom();
    resetPreviewDom();
    imagesArr.splice(0, imagesArr.length);
    roomSliderHotelCont.empty();
    inclusion.empty();
}
// handler for column click in review room
const columnSelectReviewHandler = (element) =>{
    clearFormDataHandler();
    showSelectedRoomReviewDom();
    const roomid = element.getAttribute('data-id');
    roomLanguageSelect.attr('data-shopselect',roomid);
    limit = defaultRowVal;
    const code = 0;
    froomid.val(roomid);
    rtlroomid.val(roomid);
    languageSelect.val('0')
    loadReviewRoomHandler();
    const url  = `http://210.99.223.38:13406/api/room?roomId=${roomid}`;
    console.log(url)
    // asyncget(url, cb_getSelectedRoomDetails);
    
    console.log('tr:',roomid)
}

const columnSelectApproveHandler = (element) =>{
    clearFormDataHandler();
    showSelectedRoomEditDom();
    const roomid = element.getAttribute('data-id');
    roomLanguageSelect.attr('data-shopselect',roomid);
    limit = defaultRowVal;
    const code = 0;
    froomid.val(roomid);
    rtlroomid.val(roomid); 
    languageSelect.val('0')
    loadRoomListHandler();
    const url  = `http://210.99.223.38:13406/api/room?roomId=${roomid}`;    
    console.log(url)
    // asyncget(url, cb_getSelectedRoomDetails,errorCallbackVendor);
    
    console.log('tr:',roomid)
}

const updateRoomStatusHandler = (element) =>{
    // load pop-up modal here for multiple room delete
}

const deleteRoomShopHandler = (element) =>{
    // initiate multiple room delete here
    const id = element.getAttribute('data-id')
    console.log('delete id:',id)
    const delUrl = ``
    let data = [id]
    deleteRoomTableRowDom();
    // deleteData(data, delUrl)
    // .then(function(response) {
    //     console.log(response)
    // })
    // .catch(function(error) {
    //     console.log("Request failed: " + error);
    // }); 
}

const deleteMultipleRoomHandler = () =>{

}

function closeRoomTranslatedFormHandler(){
    closeRoomTranslatedSectiondDom();
    limit = largeRowVal;
    const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${limit}`;
    // asyncget(url, cb_massageTable);
}

const testroomapiHandler = () =>{
    apiLoginVendor();
    
}
