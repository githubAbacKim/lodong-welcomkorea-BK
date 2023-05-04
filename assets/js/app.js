// run functions, run handler here, define html elements here
// array objects and default values
const startpage = 0;
const defaultRowVal = 5;
const largeRowVal  = 8;
let limit;
let pageNum;

const langArr = [];
const idArr = [];
const apiLanArr = [];
const roomtypesArr =['내부','외부'];
let pagesArr = [];
let commissionServicesArr = [];
let mustacheServicesArr = [];
let imagesArr = [];

let showEleArr = [];
let hideEleArr = [];

let mustacheRoomService = [];

const optionArr = [
    {option:"airConditioner",src:"./vendors/imgs/room_option/ac.svg"},
    {option:"bed",src:"./vendors/imgs/room_option/bed.svg"},
    {option:"cabinet",src:"./vendors/imgs/room_option/cabinet.svg"},
    {option:"chair",src:"./vendors/imgs/room_option/chair.svg"},
    {option:"lock",src:"./vendors/imgs/room_option/lock.svg"},
    {option:"microwave",src:"./vendors/imgs/room_option/microwave.svg"},
    {option:"refrigerator",src:"./vendors/imgs/room_option/ref.svg"},
    {option:"shoes",src:"./vendors/imgs/room_option/shoes.svg"},
    {option:"sink",src:"./vendors/imgs/room_option/sink.svg"},
    {option:"speaker",src:"./vendors/imgs/room_option/speaker.svg"},
    {option:"stove",src:"./vendors/imgs/room_option/stove.svg"},
    {option:"table",src:"./vendors/imgs/room_option/lock.svg"}
]

const mutedColor = 'bg-secondary opacity-25';
const colorArr = ['bg-tilt','bg-warning','bg-primary','bg-danger','bg-success','bg-info'];
const shopTypeArr = ['massage','restaurant','hotel'];

const modalContainer = $('#modalContainer');
const alertTemplate = $('#alertPopTemplate');
const modal = $('#globalModal');

const commissionTable = $('#commissionTable');
const shopTable = $('#shopTable');

// buttons
const editBtnEle = document.getElementsByClassName('.editBtn');
const deleteButtonEle = $('.deleteData');

const addCommissionButton = $('#addCommissionBtn');
const addNewPositionButton = $('#addNewPositionBtn');
const uploadShopButton = $('#uploadShopBtn');
const uploadTranslatedButton = $('#uploadTranslatedBtn');
const closeMassageButton = $('#closeMassageBtn');
const closeLanguageButton = $('#closeLanguageBtn');
const deleteCommissionButton = $('.deleteCommissionBtn');
const deleteShopButton = $('.deleteShopBtn');
const updateTranslatedShopButton = $('#updateTranslatedShopBtn');
const deleteAllButton = $('#deleteAll');
const changeStatAllButton = $('#changeStatAll');
const closeOtherSectionButton = $('#closeOtherSectionBtn');
const closeTranslatedButton = $('#closeTranslatedBtn');
const updateShopButton = $('#updateShopBtn');

// sections Elements
const massageSection = $('#massageSectionElex');
const otherSection = $('#otherSectionEle');
const translatedSection = $('#translatedSection');

const massageTableSection = $('#massageTableSection');
const roomReviewTableSection = $('#roomReviewTableSection');
const roomApproveTableSection = $('#roomApproveTableSection');

const massageSectionForm = document.querySelector('#massageSectionEle');
const otherSectionForm = document.querySelector('#otherSectionEle');
const translatedSectionForm = document.querySelector('#translatedSection');

const sectionTitleH4 = $('#section-title');

// mustache container and template
const tableBodyCont = $('#shopDataCont');
const paginationCont = $('#pagination');
const commissionCont = $('#commissionCont');
const sliderCont = $('#sliderCont');

const tableRowTempEle = $('#rowTemplate');
const paginationTemp = $('#pagingTemp');
const sidoTemp = $('#sidoTemplate');
const availablelangTemp = $('#languageTemp');
const commissionTemp = $('#commissionTemp');
const slideTemp = $('#slideTemp');

const shoptypeTemplate = $('#selectedShopTemp');
const languageSelectTemplate = $('#languageSelectTemp');
const languageAvailableTemplate = $('#languageTemp');

// div elements
const languageSelectDiv = $('#languageSelectDiv');
const previewDiv = $('#preview');
// input elements
const massageForm = $('#massageForm');
const massageFormJs = document.getElementById('massageSectionEle');

const formElements = document.getElementsByTagName('input');
const textareas = document.getElementsByTagName('textarea');
const selects = document.getElementsByTagName('select');

// const shopCheckBox = $('#shopTable input.shopCheckBox:checked');
const selectAllCheckBox = document.getElementById('selectall');
const shopCheckBox = document.querySelectorAll('.data-checkbox');

let serviceInput = $('#service');
let serviceTimeInput = $('#servicetime');
let serviceAmountInput = $('#serviceamount');

let holidayInput = $('#holiday');
let averageInput = $('#average');
let startAgeInput = $('#startAge');
let endAgeInput = $('#endAge');
let phoneNumberInput = $('#phoneNumber');

// upload shop
const shoptypeSelect = $('#shopTypeSelect');
const languageSelect = $('#languageSelect');

const timeInput = document.querySelector('input[type="time"]');

const thumbnailEl = document.getElementById('thumbnailInput');
const filesEl = document.getElementById('filesInput');

const mthumbnail = $('#thumbnailInput');
const mfiles = $('#filesInput');
const mshopid = $('#shopid');
const msalary = $('#salary');
const mtitle = $('#title');
const msubtitle = $('#subtitle');
const maddress = $('#address');
const mholiday = $('#holiday');
const mtimeEnd = $('#timeEnd');
const mtimeStart = $('#timeStart');
const msidoSelect = $('#sidocode');
const mpayday = $('#payday');
const misWorkingTimeNegotiable = $('#isWorkingTimeNegotiable');
const misHolidayNegotialble = $('#isHolidayNegotialble');
const misPayoutDateNegotiable = $('#isPayoutDateNegotiable');
const maverage = $('#average');
const mstartAge = $('#startAge');
const mendAge = $('#endAge');
const mmemo = $('#memo');
const mphoneNumber = $('#phoneNumber');
const mlineId = $('#lineId');
const mcommsalary = $('#commsalary');
const mroomtype = $('#roomtype');

// translated inputs
const tlTitle = $('#tl-title');
const tlSubtitle = $('#tl-subtitle');
const tlAddress = $('#tl-address');
const tlShopId = $('#tl-shopid');
const tlMemo = $('#tl-memo');
const tlSalary = $('#tl-salary');
// let table = new DataTable('#shopTable');

// room
const inclusionTemp = $('#inclusionTemp');
const inclusionCont = $('#inclusionCont');

const reviewRowTemp = $('#reviewRowTemp');
const reviewTableCont = $('#reviewTableCont');

const approveRowTemplate = $('#approveRowTemplate');
const approveTableCont = $('#approveTableCont');

const approveRoomBtn = $('#approveRoomBtn');
const declineRoomBtn = $('#declineRoomBtn');
const updateRoomBtn = $('#updateRoomBtn');

const roomSlideTemp = $('#roomSlideTemp');
const roomSliderHotelCont = $('#roomSliderHotelCont');

// event Handler functions
timePickerDom();
selectAllDom();
formatInputHandler();
deleteCommissionDom();
// makeGliderDom();
addNewPositionButton.on('click',addNewPositionHandler);
loadMassageViewHandler();
addCommissionButton.on('click',addCommissionHandler)
uploadShopButton.on('click',uploadShopHandler);
uploadTranslatedButton.on('click',uploadTranslatedShopHandler)
closeMassageButton.on('click',closeMassageFormHandler);
closeOtherSectionButton.on('click', closeOtherFormHandler);
closeTranslatedButton.on('click', closeTranslatedFormHandler);
updateTranslatedShopButton.on('click', updateTranslatedShopHandler);
updateShopButton.on('click',updateShopDetailsHandler);
