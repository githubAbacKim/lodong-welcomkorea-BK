// define main functions, call back functions and fetch function here


// ********************** reusable functions **********************
    // refresh table data everytime new data is added on the table
    function dtDestroy(table, tbody) {
        $('#' + table).DataTable().destroy();
        $('#' + tbody).empty();
    }
    // mustache function
    const mustacheTemplating = (container,template,data) =>{
        const $container = container;
        const $template = template.html();  
        
        $container.append(Mustache.render($template, data)); 
    }
    // call the basic overlay modal
    const globalmodal = (title,modalname) =>{
        modalname.modal("show");
        modalname.find('.modaltitle').text(title);
    }
    const asyncget = (url,callback,errcallback) => {
        $.get(url)
        .done(response => callback(response))
        .fail(error => errcallback(error));
    }
    const fetchData = (url,requestOptions,callback,errorcallback) =>{
        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => callback(result))
        .catch(error => errorcallback(error));
    }
    const ajaxget = url =>{
        var tmp;
        $.ajax({
            url:url,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (results) {
                tmp = results;
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });

        return tmp;
    }
    function postData(data, url) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            method: "POST",
            type: 'POST',
            contentType: 'application/json',
            timeout: 0,
            data: data,
            success: function(response) {
              resolve(response.message);
            },
            error: function(xhr, status, error) {
              console.log('error:', error);
              console.log('status:', status)
              console.log('xhr:', xhr)
              reject(error);
            },
          });
        });
    }
    function putData(data, url) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            method: "PUT",
            type: 'PUT',
            contentType: 'application/json',
            timeout: 0,
            // data: JSON.stringify(data),
            data: data,
            success: function(response) {
                resolve(response);
            },
            error: function(xhr, status, error) {
              console.log('error:', error);
              console.log('status:', status)
              console.log('xhr:', xhr)
              reject(error);
            },
          });
        });
    }
    function unresolvePutData(data, url,successCallback, errorCallback) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            method: "PUT",
            type: 'PUT',
            contentType: 'application/json',
            timeout: 0,
            // data: JSON.stringify(data),
            data: data,
            success: function(response) {
                successCallback(response);
            },
            error: function(xhr, status, error) {
              console.log('error:', error);
              console.log('status:', status)
              console.log('xhr:', xhr)
              errorCallback(error);
            },
          });
        });
    }
    function deleteData(data,url) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            method: "DELETE",
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
              resolve(response.message);
            },
            error: function (xhr, status, error) {
              reject(error);
            },
          });
        });
    }
    function putDataSecondary(data, url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            headers: {
            'X-HTTP-Method-Override': 'PUT'
            },
            data: data,
            success: function(response) {
            resolve(response.message);
            },
            error: function(xhr, status, error) {
            console.log('error:', error);
            console.log('status:', status)
            console.log('xhr:', xhr)
            reject(error);
            },
        });
    });
    }
    function ajaxpostImg(data,url){    
         return new Promise((resolve, reject) => {
            $.ajax({
              url: url,
              method: "POST",
              processData: false,
              mimeType: "multipart/form-data",
              contentType: false,
              data: data,
              success: function(response) {
                resolve(response);
              },
              error: function(xhr, status, error) {
                console.log('error:', error);
                console.log('status:', status)
                console.log('xhr:', xhr)
                reject(error);
              },
            });
          });
    }
    function ajaxPutImg(data, url) {
        var result = null;
        $.ajax({
            url: url,
            method: 'PUT',
            timeout: 0,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: data,
            async: true,
            success: function (responses) {
                result = responses;
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
        return result;
    }
    function ajaxdelData(url){
        let result;
        $.ajax({
            "url": url,
            "method": 'DELETE',
            "timeout": 0,
            success: function (responses) {
                result = responses;
            },
            error: function (xhr, status, error) {
                console.log('error:',error);
                console.log('status:',status)
                console.log('xhr:',xhr)
            },
        });
        return result;
    }
// ***************************** end *********************************

// ******************** processing functions **************************

    const uploadShop = (inputFiles,inputThumbnail,shopData) =>{
        const thumbnail = inputThumbnail.files[0];    
        const files = inputFiles.files;
        const uplodUrl = 'http://210.99.223.38:13405/api/shop/upload';
        const formData = new FormData();
        let newData = [];
        // previewThumbArr
        // before appending it to formdata convert first to JSON.stringify and then to Blob
        const json = JSON.stringify(shopData);
        const shopvo = new Blob([json], { 
            type: 'application/json' 
        });
        
        formData.append("shopVo",shopvo);
        for (let i = 0; i < files.length; i++) {
            const imageName = files[i].name;
            formData.append('fileList', files[i], imageName);
            console.log('files',imageName)
        }

        const thumbName = thumbnail.name;
        formData.append("thumbnail",thumbnail,thumbName);
        console.log('thumbnail',thumbName);
        console.log('shopvo',shopData);
        ajaxpostImg(formData, uplodUrl)
        .then((response) => {            
            console.log(response);
            const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
            asyncget(url, cb_massageTable);
            clearFormDataHandler();
        })
        .catch((error) => {
            console.log(error);
        });    
    }

    const uploadTranslated = (data,postUrl) =>{
        shopData = JSON.stringify(data);
        postData(shopData, postUrl)
        .then((responseMessage) => {
            const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
            asyncget(url, cb_massageTable);
            clearFormDataHandler();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const makePages = (data,url)=>{    
        paginationCont.empty();  
        for (let index = 0; index < data; index++) {
            let pagingNum = index+1;
            let apiPage = (index === 0)? 0 : index;
            
            let newPage = {'pagenum': apiPage, 'paging': pagingNum}
            // pagesArr.push(newPage); 
            
            mustacheTemplating(paginationCont,paginationTemp,newPage);          
        }
        
        // setActivePageDom();
        addprevnextBtnDom();
    }
    
    const addNewCommission = () => {
        service = serviceInput.val();
        time = serviceTimeInput.val();
        amount = serviceAmountInput.val();
        console.log(amount)
        if(service === '' || time === '' || amount === ''){
                console.log('Please fill in all input!')
        }else{
            const newCommission = {
                "serviceType": service,
                "serviceTime": changeTimeFormat(time),
                "servicePrice": parseInt(removeAllCommaVendor(amount))
            }
            commissionServicesArr.push(newCommission)
            let id = mustacheServicesArr.length;
            const newData = {
                "serviceType": service,
                "serviceTime": changeTimeFormat(time),
                "servicePrice": amount,
                "id": id,
                "idname": `deleteCommissionBtn${id}`
            }
            mustacheServicesArr.push(newData)
            mustacheTemplating(commissionCont,commissionTemp,newData);
            console.log(commissionServicesArr)
        }
    }

    const changeTimeFormat = element => {
        let timeParts = element.split(":");
        let formattedTime = timeParts[0] + ":" + timeParts[1] + ":00";
        return formattedTime;
    }

    const removeAllCommaVendor = (element) =>{
        element = element.replace(/,/g, "");
        return element;
    }

    const addFilesThumbnailVendor = (imageInput) => {
        imageInput.addEventListener('change', function() {
          const newImagesArr = [];
          for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            const reader = new FileReader();
            reader.addEventListener('load', function() {
              const imageSrc = reader.result;
              const imageName = file.name;
              const newImage = {
                name: "files",
                src: imageSrc
              };
              if (!imagesArr.some(image => image.src === imageSrc)) {
                newImagesArr.push(newImage);
                imagesArr.push(newImage);
                displaySelectedImagesVendor(newImage);
                if (document.querySelector('#filesInput').files.length > 0) {
                    $('.glider-content').addClass('d-block');
                    // makeGliderDom();
                }
              }
            });
            reader.readAsDataURL(file);
          }
          if (imageInput.files.length === 0) {
            imagesArr = imagesArr.filter(image => image.name !== "files");
            removeImageToListVendor('files');
            displaySelectedImagesVendor();
            resetPreviewDom();
          }
        });
    };

    const addThumbVendor = (imageInput) => {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', function() {
            const imageSrc = reader.result;
            const imageName = file.name;
            const newImage = {
                name: "thumbnail",
                src: imageSrc
            };
            const existingThumb = imagesArr.find(image => image.name === "thumbnail");
        
            if (existingThumb) {
                imagesArr = imagesArr.filter(image => image.name !== "thumbnail");
                removeImageToListVendor('thumbnail');
            }
        
            if (!imagesArr.some(image => image.src === imageSrc)) {
                imagesArr.push(newImage);
                displaySelectedImagesVendor(newImage);
            }
            });
            if (document.querySelector('#filesInput').files.length > 0) {
                $('.glider-content').addClass('d-block');
                // makeGliderDom();
            }
            if (imageInput.files.length === 0) {
            imagesArr = imagesArr.filter(image => image.name !== "thumbnail");
            removeImageToListVendor('thumbnail');
            displaySelectedImagesVendor();
            resetPreviewDom();
            }
        
            reader.readAsDataURL(file);
            console.log(imagesArr);
        });
    };

    const displaySelectedImagesVendor = () =>{        
        console.log('imagesArr',imagesArr)
        sliderCont.empty();
        $.each(imagesArr,function(i,d){
            let active = (i === 0) ? 'active' : '';
            let displayData = {
                'name':d.name,
                'src':d.src,
                'active': active
            }            
            mustacheTemplating(sliderCont,slideTemp,displayData);
        })
    }

    const displaySelectedRoomsImgVendor = () =>{        
        console.log('imagesArr',imagesArr)
        roomSliderHotelCont.empty();
        $.each(imagesArr,function(i,d){
            let active = (i === 0) ? 'active' : '';
            let displayData = {
                'name':d.name,
                'src':d.src,
                'active': active
            }            
            mustacheTemplating(roomSliderHotelCont,roomSlideTemp,displayData);
        })
    }

    const removeImageToListVendor = (type) =>{
        imagesArr = imagesArr.filter(function(obj) {
            return obj.name !== type;
        });
    }

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(amount);
    }

    const getLanguageCodeVendor = language =>{
        const result = apiLanArr.find(obj => obj.selectlanguage === language);
        return result ? result.selectlangid : 0;
    }

    const getLanguageNameVendor = code =>{
        console.log(code);
        console.log(apiLanArr)
        const result = apiLanArr.find(obj => obj.selectlangid === code);
        return result ? result.selectlanguage : '';        
    }

    const appendCommissionToListVendor = (data) =>{
        $.each(data,(i,d)=>{
            const newCommission = {
                "serviceType": d.serviceType,
                "serviceTime": changeTimeFormat(d.serviceTime),
                "servicePrice": parseInt(d.servicePrice)
            }
            commissionServicesArr.push(newCommission)
            let id = mustacheServicesArr.length;
            const newData = {
                "serviceType": d.serviceType,
                "serviceTime": changeTimeFormat(d.serviceTime),
                "servicePrice": formatMoney(d.servicePrice),
                "id": i,
                "idname": `deleteCommissionBtn${i}`
            }
            mustacheServicesArr.push(newData)
            mustacheTemplating(commissionCont,commissionTemp,newData);
        })
        
    }

    const appendToOptionList = (data) =>{
        $.each(data,(i,d)=>{
            const newCommission = {
                "serviceType": d.serviceType,
                "serviceTime": changeTimeFormat(d.serviceTime),
                "servicePrice": parseInt(d.servicePrice)
            }
            commissionServicesArr.push(newCommission)
            let id = mustacheServicesArr.length;
            const newData = {
                "serviceType": d.serviceType,
                "serviceTime": changeTimeFormat(d.serviceTime),
                "servicePrice": formatMoney(d.servicePrice),
                "id": i,
                "idname": `deleteCommissionBtn${i}`
            }
            mustacheServicesArr.push(newData)
            mustacheTemplating(commissionCont,commissionTemp,newData);
        })
    }

    const updateStatusVendor = (data,url,element) =>{
        const shopData = JSON.stringify(data);        
        putData(shopData,url)
        .then((responseMessage) => {
            $(element).find('i').toggleClass('fa-eye fa-eye-slash');
            $(element).closest("tr").toggleClass('opacity-25 opacity-100');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const updateShopDetailsVendor = (data,url) =>{
        const shopvo = JSON.stringify(data);
        putData(shopvo,url)
        .then((responseMessage) => {
            if(responseMessage === "success"){
                //clear form
                clearFormDataHandler();
                const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
                asyncget(url, cb_massageTable);
                //call close massage section handler
            }
        })
        .then(result => console.log(result))
        .catch((error) => {
            console.log(error);
        });
    }

    const updateTranslatedShopVendor = (data,url) =>{
        const shopvo = JSON.stringify(data);
        putData(shopvo,url)
        .then((responseMessage) => {
            clearFormDataHandler();
            closeTranslatedSectiondDom();
            const url  = `http://210.99.223.38:13405/api/shop/list/${startpage}/${largeRowVal}`;
            asyncget(url, cb_massageTable);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const updateMultipleStatusVendor = (data,url) =>{
        const shopData = JSON.stringify(data);        
        // unresolvePutData(shopData,url,function(response){
        //     console.log(response)
        //     const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
        //     asyncget(url, cb_massageTable);   
        // }),function(error){
        //     // Error callback
        //     console.log("AJAX request failed with error:", error);
        // }
        putData(shopData,url)
        .then((responseMessage) => {
            selectAllCheckBox.checked=false;
            const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
            asyncget(url, cb_massageTable);   
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const deleteMultipleShopVendor = (data,url) =>{
        deleteData(data, url)
        .then(function(response) {
            selectAllCheckBox.checked=false;
            const url  = `http://210.99.223.38:13405/api/shop/list/${pageNum}/${limit}`;
            asyncget(url, cb_massageTable);   
        })
        .catch(function(error) {
            console.log("Request failed: " + error);
        }); 
    }

    const deleteShopVendor = () =>{
        deleteShopTableRowDom(element)
        deleteData(data, delUrl)
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log("Request failed: " + error);
        });  
    }

    // room section
    const apiLoginVendor = () => {
        const url = 'http://210.99.223.38:13405/api/user/login';
        const data = {
            "username" : "admin",
            "password" : "admin1001"
        }
        const logindata = JSON.stringify(data);
        postData(logindata, url)
        .then((response) => {     
            console.log(response)
            let url = `http://210.99.223.38:13405/api/room/web/admin/list/0/5`
            asyncget(url, cb_test,errorCallbackVendor);
            fetchGet(url,requestOptions,callback,errorcallback)
        })
        .then(result => console.log(result))
        .catch((error) => {
            console.log(error);
        });
        // const url = 'http://210.99.223.38:13405/api/user/login';
        // const data = {
        //     "username" : "admin",
        //     "password" : "admin1001"
        // }
        // var requestOptions = {
        //     method: 'POST',
        //     body: data,
        //     redirect: 'follow'
        //   };
        // fetchData(url,requestOptions,callback,errorcallback)
    }

    const cb_logIn = () =>{
        
    }

    const approveRoomVendor = () =>{

    }

    const declineRoomVendor = () =>{

    }

    const updateRoomVendor = () =>{

    }

    const singRoomDeleteVendor = () =>{

    }

    const multipleRoomDeleteVendor = () =>{

    }


// ***************************** end ************************************

// ******************* callback functions for async get **********************

    const cb_massageTable = (response)=>{
        console.log('shopList:',response)
        console.log(pagesArr)
        const massagedata = response.data.shop;
        tableBodyCont.empty();  
        $.each(massagedata, function( i, d){
            const paging = '';
            const workinfo = `${d.startWorkingTime}~${d.endWorkingTime}`;
            const languages = d.languages;
            const defaultPic = './vendors/imgs/thumbnail-default.svg';
            const thumbnail = (d.thumbnail !== null)? d.thumbnail: defaultPic;
            let icon = (d.status === "reviewing")? 'fa-eye-slash':'fa-eye';
            let rowClass = (d.status === "reviewing")? 'opacity-25': 'opacity-100'
            let shopId = d.id;
            const data = {
                'id':d.id,
                'thumbnail':thumbnail,
                'title':d.title,
                'subtitle':d.subTitle,
                'salary':formatMoney(d.salary),
                'address': d.address,
                'workinfo':workinfo,
                'modalid':'modal'+i,
                'langid':'lang'+i,
                'buttonid':'button'+i,
                'status':d.status,
                'statIcon': icon,
                'rowClass': rowClass,
                'index':i
            };        
            mustacheTemplating(tableBodyCont,tableRowTempEle,data);

            const langCont = $(`#lang${i}`);
            langCont.empty();  
            $.each(apiLanArr,(i,dd) => {
                let classBg;
                let clickev;
                let dataLang = dd.language;
                let acroLang = apiLanArr
                    .filter(data => data.language.includes(dd.language))
                    .map(data => data.language)[0]
                    .substr(0, 2)
                    .toUpperCase();
                    
                    if(languages !== null){
                        let isInLanguageArr = languages.includes(dataLang);
                        classBg = isInLanguageArr ? colorArr[i] : mutedColor;
                        clickev = isInLanguageArr ? "selectLanguageTransHandler(this)" : "";
                    }else{
                        classBg = mutedColor;
                        clickev = "";
                    }
                    const mustData = {
                        language: acroLang,
                        bg: classBg,
                        full: dd.language,
                        code: dd.code,
                        shopId: shopId,
                        click: clickev
                    };         
                mustacheTemplating(langCont, availablelangTemp, mustData);
            });
        });            
        const tpage = response.data.totalPages;        
        makePages(tpage);
    }
    const cb_translatedTable = (data)=>{
        console.log('massage table',data)
    }
    const cb_sidoCode = (response)=>{
        console.log('sido',response)
        msidoSelect.empty();   
        $.each(response.data, function(i, d){               
            const data = {
                'sidoCode':d.code,
                'sidoName':d.name
            };
            mustacheTemplating(msidoSelect,sidoTemp,data);
        });
    }
    const cb_languageData = (response)=>{    
        console.log('language:',response)
        languageSelect.empty();   
        prependOptionDom(languageSelect,'Language'); 
        $.each(response.data, function(lang, d){      
            const datalang = {
                'code':d.id,
                'language':d.language,
                'logo':d.languagePhoto
            };
            mustacheTemplating(languageSelect,languageSelectTemplate,datalang);
            mustacheTemplating(roomLanguageSelect,roomLangSelectTemp,datalang);             
            apiLanArr.push(datalang);
        });
        console.log('apiLang:',apiLanArr);
    }
    const cb_shopType = (response)=>{    
        console.log('shop type data:',response.data)
        shoptypeSelect.empty(); 
        prependOptionDom(shoptypeSelect,'Shop Type');   
        $.each(response.data, function(i, d){                
            const datalang = {
                'shoptypeid':d.id,
                'shoptype':d.shopType
            };
            mustacheTemplating(shoptypeSelect,shoptypeTemplate,datalang);
        });
    }
    const cb_commissionData = (data)=>{
        console.log(data)
        // make processing here.
    }
    const cb_shopDetails = response =>{
        console.log('shop details',response.data.shopTranslatedDto)
        let data = response.data;
        
        $.each(data,function(i,d){
            console.log(d.address)

            tlTitle.val(d.title)
            tlSubtitle.val(d.subTitle)
            tlAddress.val(d.address)
            tlShopId.val(d.translatedId)
            tlMemo.val(d.memo)
        })
    }
    const cb_fullShopDetails = response =>{
        console.log('shop details',response.data.shopTranslatedDto)
        let data = response.data;
        
        $.each(data,function(i,d){
            $('#title').val(d.title);
            $('#subtitle').val(d.subtitle)
            salaryInput.val(d.salary);
            $('#address').val(d.address)
            $('#holiday').val(d.holiday)
            $('#timeEnd').val(d.timeEnd)
            $('#timeStart').val(d.timeStart)
            $('#sidoSelect').val(d.sidoSelect)
            $('#payday').val(d.payday)
            $('#isWorkingTimeNegotiable').prop('checked',d.isWorkingTimeNegotiable)
            $('#isHolidayNegotialble').prop('checked',d.isHolidayNegotialble)
            $('#isPayoutDateNegotiable').prop('checked',d.isPayoutDateNegotiable)
            $('#average').val(d.average)
            $('#startAge').val(d.startAge)
            $('#endAge').val(d.endAge)
            $('#memo').val(d.memo)
            $('#phoneNumber').val(d.phoneNumber)
            $('#lineId').val(d.lineId)
            languageSelect.val()
            $('#commsalary').val(d.commsalary)
            $('#roomtype').val(d.roomtype)
            appendCommissionToListVendor(d.shopServicesList)
            let thumb = {'name':'thumbnail','src':d.thumbnail}
            imagesArr.push(thumb);
            $.each(d.photo,function(i,d){
                thumb = {'name':'files','src':d}
                imagesArr.push(thumb)
            })
            let code = getLanguageCodeVendor(d.shopTypeSelect)
            console.log(apiLanArr)
        })
        // display images
        displaySelectedImagesVendor();
    }
    const cb_selectedShopVendor = response =>{
        console.log('shop details',response.data.shopTranslatedDto)
        let shopdata = response.data.shopTranslatedDto;
            mtitle.val(shopdata.title);
            msubtitle.val(shopdata.subTitle);
            msalary.val(shopdata.salary);
            maddress.val(shopdata.address);
            mholiday.val(shopdata.holiday);
            mtimeEnd.val(shopdata.endWorkingTime);
            mtimeStart.val(shopdata.startWorkingTime);
            msidoSelect.val(shopdata.sidoCode);
            mpayday.val(shopdata.payoutDate)
            misWorkingTimeNegotiable.prop('checked',shopdata.isWorkingTimeNegotiable)
            misHolidayNegotialble.prop('checked',shopdata.isHolidayNegotialble)
            misPayoutDateNegotiable.prop('checked',shopdata.isPayoutDateNegotiable)
            maverage.val(shopdata.average);
            mstartAge.val(shopdata.startAge);
            mendAge.val(shopdata.endAge);
            mmemo.val(shopdata.memo);
            mphoneNumber.val(shopdata.contact);
            mlineId.val(shopdata.lineId);
            languageSelect.val();
            mcommsalary.val(shopdata.commissionDate);
            mroomtype.val(shopdata.roomType);
            appendCommissionToListVendor(shopdata.shopServicesList);
            let thumb = {'name':'thumbnail','src':shopdata.thumbnail}
            imagesArr.push(thumb);
            $.each(shopdata.photo,function(i,d){
                thumb = {'name':'files','src':d}
                imagesArr.push(thumb)
            })

        displaySelectedImagesVendor();
        if (imagesArr.length > 0) {
            $('.glider-content').addClass('d-block');
        }
    }
    const cb_selectLanguageShop = response =>{
        // if language select exist, display data to translated form and show UPDATE Translated button
        showUpdateTranslatedButtonDOM();
        let data = response.data;
        
        $.each(data,function(i,d){
            console.log(d.address)

            tlTitle.val(d.title)
            tlSubtitle.val(d.subTitle)
            tlAddress.val(d.address)
            tlShopId.val(d.translatedId)
            tlMemo.val(d.memo)
            tlSalary.val(d.salary)
        })
        console.log(response)        
    }
    const cb_noLanguageTranslated = response =>{
        // else if language do not exist, display blank tranlated form and show UPLOAD Translated button
        showNewTranslatedButtonDOM();
        clearTranslatedFormDom();
        console.log(response.responseJSON.data)
    }
    const cb_putAjax = response =>{
        return response.message
    }
    const errorCallbackVendor = (error) =>{
        // const modalData = {
        //     message:error
        // }
        // const title = 'Alert Message!';
        // globalmodal (title,modal);
        // modalContainer.empty();
        // mustacheTemplating(modalContainer,alertTemplate,modalData);
        console.log(error)
    }
    // call back for room section
    const cb_reviewRoomTable = (response) =>{
        console.log('review_rooms:',response,'total-pages',response.data.totalPages)
        let data =  response.data.room;
        reviewTableCont.empty();
        $.each(data,(i,d)=>{      
            const paging = '';
            const languages = d.languages;
            const defaultPic = './vendors/imgs/thumbnail-default.svg';
            const thumbnail = (d.photoPath !== null)? d.photoPath: defaultPic;
            let icon = (d.status === "reviewing")? 'fa-eye-slash':'fa-eye';
            let rowClass = (d.status === "reviewing")? 'muted': '';
            let shopId = d.id;      
            const data = {
                "roomId": d.roomId,
                "deposit": d.deposit,
                "rent": d.rent,
                "address": d.address,
                "status": d.status,
                "createAt": d.createAt,
                "roomOptionId": d.roomOptionId,
                "estateName": d.estateName,
                "saleNumber": d.saleNumber,
                "estateContact": d.estateContact,
                'thumbnail':thumbnail,
            }
            mustacheTemplating(reviewTableCont,reviewRowTemp,data);   
        })
        const tpage = response.data.totalPages;        
        makePages(tpage);
    }

    const cb_roomListTable = (response) =>{
        console.log('roomlist',response)
        let data = response.data.room
        approveTableCont.empty();
        $.each(data,(i,d)=>{
            const paging = '';
            const languages = d.languages;
            const defaultPic = './vendors/imgs/thumbnail-default.svg';
            const thumbnail = (d.photoPath !== null)? d.photoPath: defaultPic;
            let icon = (d.status === "reviewing")? 'fa-eye-slash':'fa-eye';
            let rowClass = (d.status === "reviewing")? 'muted': '';
            let shopId = d.id;
            const data = {
                "roomId": d.roomId,
                "deposit": d.deposit,
                "rent": d.rent,
                "address": d.address,
                "status": d.status,
                "createAt": d.createAt,
                "roomOptionId": d.roomOptionId,
                "estateName": d.estateName,
                "saleNumber": d.saleNumber,
                "estateContact": d.estateContact,
                'thumbnail':thumbnail,
                "languages": d.languages,
                'langid':'lang'+i,
                'buttonid':'button'+i,
                'statIcon': icon,
                'rowClass': rowClass,
                'index':i
            }
            mustacheTemplating(approveTableCont, approveRowTemplate,data);
            // loading language
            const langCont = $(`#lang${i}`);
            langCont.empty();  
            $.each(apiLanArr,(i,dd) => {
                let classBg;
                let clickev;
                let dataLang = dd.language;
                let acroLang = apiLanArr
                    .filter(data => data.language.includes(dd.language))
                    .map(data => data.language)[0]
                    .substr(0, 2)
                    .toUpperCase();
                    
                    if(languages !== null){
                        let isInLanguageArr = languages.includes(dataLang);
                        classBg = isInLanguageArr ? colorArr[i] : mutedColor;
                        clickev = isInLanguageArr ? "selectLanguageTransHandler(this)" : "";
                    }else{
                        classBg = mutedColor;
                        clickev = "";
                    }
                    const mustData = {
                        language: acroLang,
                        bg: classBg,
                        full: dd.language,
                        code: dd.code,
                        shopId: shopId,
                        click: clickev
                    };         
                mustacheTemplating(langCont, availablelangTemp, mustData);
            });
        })
        const tpage = response.data.totalPages;         
        makePages(tpage);
    }

    const cb_getSelectedRoomDetails = (response) =>{
        let data = response.data.roomTranslationDto
        let optionArr = [];
        const inputdata = {
            "id": data.id,
            "userId": data.userId,
            "frontMemo": data.frontMemo,
            "deposit": data.deposit,
            "rent": data.rent,
            "address": data.address,
            "liveInDate": data.liveInDate,
            "isNowLiveIn": data.isNowLiveIn,
            "contractEndYear": data.contractEndYear,
            "contractEndMonth": data.contractEndMonth,
            "floor": data.floor,
            "roomType": data.roomType,
            "size": data.size,
            "sizeOption": data.sizeOption,
            "memo": data.memo
        }
        $('#roomtitle').val(data.frontMemo);
        $('#roomaddress').val(data.address);
        $('#roommovedate').data(data.liveInDate);
        $('#isMoveInDatePossible').prop('checked',isNowLiveIn);
        $('#roominfo').val(data.memo);
        $('#roomdeposit').val(data.deposit);
        $('#roomrent').val(data.rent);
        $('#roomyear').val(data.contractEndYear);
        $('#roommonth').val(data.contractEndMonth);
        $('#roomarea').val(data.size);
        $('#floor').val(data.floor);
        $('#elevator').prop('checked',elevator);
        $('#roomtyperooms').val(data.roomType);

        let refclass = (data.refrigerator === true) ? "opacity-100" : "opacity-25";
        let acclass = (data.airConditioner === true) ? "opacity-100" : "opacity-25";
        let washingclass = (data.washingMachine === true) ? "opacity-100" : "opacity-25";
        let sinkclass = (data.sink === true) ? "opacity-100" : "opacity-25";
        let bedclass = (data.bed === true) ? "opacity-100" : "opacity-25";
        let gasStoveclass = (data.gasStove === true) ? "opacity-100" : "opacity-25";
        
        const optionlist = [
            {name:'refrigerator',isTrue:data.refrigerator, optionStat:refclass, photoPath:"./vendors/imgs/room_option/ref.svg"},
            {name:'washingMachine',isTrue:data.washingMachine, optionStat:washingclass, photoPath:"./vendors/imgs/room_option/washing.svg"},
            {name:'sink',isTrue:data.sink, optionStat:sinkclass, photoPath:"./vendors/imgs/room_option/sink.svg"},
            {name:'airConditioner',isTrue:data.airConditioner, optionStat:acclass, photoPath:"./vendors/imgs/room_option/ac.svg"},
            {name:'bed',isTrue:data.bed, optionStat:bedclass, photoPath:"./vendors/imgs/room_option/bed.svg"},
            {name:'gasStove',isTrue:data.gasStove, optionStat:gasStoveclass, photoPath:"./vendors/imgs/room_option/stove.svg"}
        ]

        $.each(optionArr,(i,d)=>{
            const newOPtionData = {
                
            }

            mustacheTemplating(inclusionCont,inclusionTemp,newOPtionData);
        })

        let thumb = {'name':'thumbnail','src':data.photoThumbnail}   
        $.each(data.photos,function(i,d){
            thumb = {'name':'files','src':d}
            imagesArr.push(thumb)
        })

        displaySelectedRoomsImgVendor();
    }

    const cb_selectedLanguageRoom = () =>{
        // const rtlfrontmemo = 
        // const rtladdress = 
        // const rtlmemo = 
        // const language = roomLanguageSelect.val()
        // const rtlroomid = 
    }

    const cb_test = (response) =>{
        
    }