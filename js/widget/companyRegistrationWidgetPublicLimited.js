$.widget("obrs.companyRegistrationWidget", {
    options: {
        message:{},
        stepStatusCompleted: 'COMPLETED',
        stepStatusOngoing: 'ONGOING',
        stepStatusUpcoming: 'UPCOMING',
    },
    _create: function () {
        var self = this;
        self.el = {};
        self.data = {};
        self.el.form = $("#company-registration");
        self.el.stepProgressBar = $("#step-progress-bar");
        self.el.stepProgressLeftPart = $(".stepProgressLeftPart");
        self.el.stepProgressRightPart = $(".stepProgressRightPart");
        self.data.formObject = [];
        formObject = []; // Global var
        self.data.stepStatus = {};
        self.data.masterData = {};
        self.data.codeWithIndexMap = {};
        self.data.currentStepCode = '';
        self.data.lastVisitedStepCode = '';
        self.data.stepItemCount = 0;
        self.data.nextStepCode = '';
        self.data.greenColorCode = '';
        self.data.yellowColorCode = '';
        self.data.prevBtn = '<a class="btn btn-outline-secondary prevBtn" style="width: 200px;" href="#"><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Previous</a>';
        self.data.nextBtn = '<a class="btn btn-outline-primary nextBtn" style="width: 200px;" href="#">Next &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i></a>';

        self.data.stepStatus = {}

        self.data.progressStepJson = [
            {
                "code": "ENTITY_TYPE_FORM",
                "header": "Entity Type",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "",
                "header": "A. General Information",
                "itemList": [
                    {
                        "code": "COMPANY_NAME_FORM",
                        "header": "a.1 Company Name",
                        "question": "What would be your company name?"
                    },
                    {
                        "code":"ADDRESS_FORM",
                        "header":"a.2 Address",
                        "question": "What would be your company name?"

                    },
                    {
                        "code":"BUSINESS_OBJECT_FORM",
                        "header":"a.3 Business Object",
                        "question": "What would be your company name?"
                    },
                    {
                        "code":"BUSINESS_DETAILS_FORM",
                        "header":"a.4 Business Details",
                        "question": "What would be your company name?"
                    }
                ]
            },
            {
                "code":"BUSINESS_COMMENCEMENT_BUSINESS_FORM",
                "header":"Declaration before Commencement of Business",
                "question": "What would be your company name?",
                "itemList": []
            },
            {
                "code": "SHARE_HOLDER_FORM",
                "header": "Share Holder details",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "SHARE_HOLDER_POSITION_FORM",
                "header": "Share Holder position details",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "MOA_FORM",
                "header": "MOA",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "AOA_FORM",
                "header": "AOA",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "WITNESS_FORM",
                "header": "Witness",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
            {
                "code": "PREVIEW_FORM",
                "header": "Preview",
                "subHeader": "",
                "question": "What's you entity type?",
                "itemList": []
            },
        ];

        // self.el.stepProgressLeftPart.html(self.createStepProgressLeftPanel());
        // self.el.stepProgressRightPart.html(self.createRightPanel());

       /* $(document).ready(function(){
            $('.companyRegistrationFormWrapper').css('height', $(window).height() - 50);
            $('#step-progress-bar').css('height', $(window).height() - 50);
        });

        $(window).resize(function(){
            $('.companyRegistrationFormWrapper').css('height', $(window).height() - 50);
            $('#step-progress-bar').css('height', $(window).height() - 50);
        });*/

        self.getCommonDataForFormElement(function(){
            self.el.stepProgressLeftPart.html(self.createStepProgressLeftPanel());
            self.el.stepProgressRightPart.html(self.createRightPanel());
            self.uiEventInitialization();
            self.setContentMaxHeight();
        });
    },
    _init: function () {
        var options = this.options;
        var self = this;
    },
    initiateFormValidation: function () {
    },
    getCommonDataForFormElement: function(callbackFn){
        var self = this;
        Obrs.APP.startLoading();
        $.get('./getCommonData.json', {}, function (result) {
            console.log("Result is :: " + result.liabilityTypeList);
            self.data.masterData = result;
        }).then(function(){
            if (typeof callbackFn == 'function') {
                console.log("SMNLOG :: ========= Executing Call back Fn ========");
                callbackFn();
            }
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    getFormHtmlByCode: function(stepObject, parentObject){
        var self = this;
        const entityForm = self.getFormObject(parentObject, stepObject);
        console.log(entityForm);

        // To Avoid infinite loop
        if(stepObject.code !== 'PREVIEW_FORM'){
            self.data.formObject.push(entityForm);
            formObject.push(entityForm);
        }

        return self.getFormWrapperDiv(
            entityForm.getFormHtml(true)
        );

       /*else if(stepObject.code === 'ADDRESS_OF_THE_ENTITY_FORM'){
            return self.getFormWrapperDiv(self.getAddressInfoForm(stepObject, parentObject));
        }else if(stepObject.code === 'BUSINESS_INFORMATION_FORM'){
            return self.getFormWrapperDiv(self.getBusinessInfoForm(stepObject, parentObject));
        }*/
    },
    getFormObject: function(parentObject, stepObject){
        var self = this;
        if(stepObject.code === 'ENTITY_TYPE_FORM'){
            console.log(self.data.masterData.liabilityTypeList);
            return new EntityTypeForm(self.data.masterData.companyTypeList, self.data.masterData.liabilityTypeList);
        }else if(stepObject.code === 'COMPANY_NAME_FORM'){
            return new CompanyNameForm(parentObject.header, stepObject.header);
        }else if(stepObject.code === 'ADDRESS_FORM'){
            return new AddressInfoForm(
                parentObject.header,
                stepObject.header,
                self.data.masterData.divisionList,
                self.data.masterData.districtList,
                self.data.masterData.upazilaList
            );
        }else if(stepObject.code === 'BUSINESS_OBJECT_FORM'){
            console.log("SMNLOG BUSINESS_OBJECT_FORM ============::");
            return new BusinessObjectForm(
                parentObject.header,
                stepObject.header,
                self.data.masterData.moaSectionList
            );
        }else if(stepObject.code === 'BUSINESS_DETAILS_FORM'){
            return new BusinessDetailsForm(parentObject.header, stepObject.header);
        }else if(stepObject.code === 'QUALIFIED_SHARES_FORM'){
            return new QualifiedSharesForm(stepObject.header, stepObject.header);
        }else if(stepObject.code === 'SHARE_HOLDER_FORM'){
            return new ShareHolderDetailsForm(stepObject.header, stepObject.header,
                [/*
                    {"id": 1, "name":"A", "type":"LOCAL INDIVIDUAL", "noOfShare": 15},
                    {"id": 2, "name":"B", "type":"LOCAL CORPORATE", "noOfShare": 10},
                    {"id": 3, "name":"C", "type":"CORPORATE FOREIGN", "noOfShare": 5}*/
                ]
            );
        }else if(stepObject.code === 'SHARE_HOLDER_POSITION_FORM'){
            return new ShareHolderPositionForm(stepObject.header, stepObject.header,
                [
                    {"id": 1, "name":"Md Habibur Rahaman", "type":"LOCAL INDIVIDUAL", "noOfShare": 15},
                    {"id": 2, "name":"Nafiul karim", "type":"LOCAL CORPORATE", "noOfShare": 10},
                    {"id": 3, "name":"Mehedi hasan", "type":"LOCAL INDIVIDUAL", "noOfShare": 5},
                    {"id": 4, "name":"Rabiul Islam", "type":"LOCAL INDIVIDUAL", "noOfShare": 5},
                    {"id": 5, "name":"Rubel Miah", "type":"LOCAL INDIVIDUAL", "noOfShare": 5}
                ]
            );
        }else if(stepObject.code === 'MOA_FORM'){
            return new MoaForm(stepObject.header, stepObject.header, [], self.options.message.dataTableConfig, self.data.masterData.moaSectionList);
        }else if(stepObject.code === 'AOA_FORM'){
            return new AoaForm(stepObject.header, stepObject.header, [
                {'id': 1, 'title':'Ship breaking and dismantling', 'aoaClause': 'This class includes the growing of rice (including organic farming and the growing of genetically modified rice).'},
                {'id': 2, 'title':'Disassembly and Recycling', 'aoaClause': 'This class includes the growing of rice (including organic farming and the growing of genetically modified rice).'},
                {'id': 3, 'title':'Ship breaking and dismantling', 'aoaClause': 'This class includes the growing of rice (including organic farming and the growing of genetically modified rice).'}
            ]);
        }else if(stepObject.code === 'WITNESS_FORM'){
            return new WitnessForm(stepObject.header, stepObject.header);
        }else if(stepObject.code === 'PREVIEW_FORM'){
            return new PreviewForm(stepObject.header, stepObject.header);
        }
        else if(stepObject.code === 'BUSINESS_COMMENCEMENT_BUSINESS_FORM'){
            return new BusinessDetailsPublic(stepObject.header, stepObject.header);
        }
    },
    createRightPanel: function(){
        var self = this;

        let html = '<div id="registration-carousel" class="carousel slide" data-bs-interval="false">'
                  + '<div class="carousel-inner">'

        $.each(self.data.progressStepJson, function(ids, parentObj){

            if(parentObj.code !== ''){
                html += self.wrapFormByCarouselItem(
                    self.getFormHtmlByCode(parentObj, null),
                    ids === 0,
                    parentObj.code
                );
            }

            $.each(parentObj.itemList, function(index, childItem){
                html += self.wrapFormByCarouselItem(
                    self.getFormHtmlByCode(childItem, parentObj),
                    ids === 0,
                    childItem.code
                );
            });
        });

        html += ' </div>'
               + '</div>';
        return html;
    },
    wrapFormByCarouselItem: function(html, isActive, code){
        return '   <div class="carousel-item ' + (isActive ? 'active' : '') +'" data-form-code="'+ code +'">'
                + '<div class="d-block w-100 h-100">'
                + html
                + '</div>'
                + '</div>';
    },
    uiEventInitialization: function () {
        var self = this;

        $(document).on('click', '.nextBtn', function(){
            console.log("SMNLOG :: Next btn clicked.");
            $(document).find('.carousel').carousel('next');
        });

        $(document).on('click', '.prevBtn', function(){
            console.log("SMNLOG :: Prev btn clicked.");
            $(document).find('.carousel').carousel('prev');
        });

        $(document).on('click', '.clickable-steps', function(){
            let idx = parseInt($(this).attr('data-index'));

            if(idx != 0 && !idx){
                idx = +$(this).closest('li.common').attr('data-index');
            }

           

            $(document).find('.carousel').carousel(idx);
        });

        $('#registration-carousel').on('slide.bs.carousel', function (event) {
            if(Obrs.APP.SELECTED_VALUES.SELECTED_ENTITY_TYPE != "9") {
                if($(event.relatedTarget).attr('data-form-code') == "BUSINESS_COMMENCEMENT_BUSINESS_FORM") {
                    if(event.direction == "left") {
                        $('.prevtBtn').trigger('click');
                    } else {
                        $('.nextvBtn').trigger('click');
                    }
                } 
            }   
            
            self.fillCurrentPrevAndNextStep($(event.relatedTarget).attr('data-form-code'));                       
            self.updateStepProgressIcon();

            console.log("SELECTED FORM " + $(event.relatedTarget).attr('data-form-code'));
            if($(event.relatedTarget).attr('data-form-code') == "SHARE_HOLDER_POSITION_FORM") {
                $('.directorMultiSelect').val([1,2,3]).trigger('change').trigger('select2:select');
            } else if ($(event.relatedTarget).attr('data-form-code') == "MOA_FORM" && Obrs.APP.SELECTED_VALUES.SELECTED_MOA_TYPE) {
                $(".moaTypeSelect").val(Obrs.APP.SELECTED_VALUES.SELECTED_MOA_TYPE);
            } else if($(event.relatedTarget).attr('data-form-code') == "COMPANY_NAME_FORM") {
                $('.non-prvt-entity .prvt-entity').hide();
                if(Obrs.APP.SELECTED_VALUES.SELECTED_ENTITY_TYPE != "11") {
                    $('.non-prvt-entity').show();
                    $('.prvt-entity').hide();        
                } else {
                    $('.prvt-entity').show();
                    $('.non-prvt-entity').hide();
                }
            } else if($(event.relatedTarget).attr('data-form-code') == "BUSINESS_DETAILS_FORM") {
                if(Obrs.APP.SELECTED_VALUES.SELECTED_ENTITY_TYPE == "9") {
                    $('.public-limited').show();
                } else {
                    $('.public-limited').hide();
                }
            }
        });

        $.each(self.data.formObject, function(idx, formObj){
            formObj.bindEvents();
        });
    },
    createStepProgressLeftPanel: function(){
        var self = this;
        var html = '<div class="flex-column gap-28 bg-white" id="step-progress-bar">'
                   + '<div class="fs-20b">Status Bar</div>'
                   + '<div id="form-progress-bar" class="d-flex flex-column my-4">'

            if(self.data.progressStepJson && self.data.progressStepJson.length > 0){
                $.each(self.data.progressStepJson, function(index, parentItem){
                    html += self.createMainStepWithChildList(parentItem);
                });
            }
        html += '</div>'
                + '</div>';
        return html;
    },
    createMainStepWithChildList: function(stepObject){
        var self = this;
        var lastChild = false;
        let html = '<div class="d-flex main-border-div">'
                    + '<div class="inner-div d-flex gap-3 w-100 pb-10' + (stepObject.itemList.length > 0 ? '' : ' align-items-center') + '"'
                        + ' data-code="'+ stepObject.code +'"'
                        + ' data-has-parent="false">'
                    + '<div class="d-flex '+ (stepObject.itemList.length > 0 ? 'pt-3' : '') + '">'
                    + self.getStatusIcon(self.data.stepStatus[stepObject.code], false, self.data.stepItemCount === 0)
                    + '</div>';

        if(self.data.stepItemCount === 0) self.data.currentStepCode = stepObject.code; // Keeping first slide code to global cache

        if(stepObject.itemList && stepObject.itemList.length > 0){

            html += '<div>';
            html += '<span class="common status-bar-font">'+ (stepObject.header || 'Not defined') +'</span>';
            html += '<ul class="reg-form-progess-list">';

            $.each(stepObject.itemList, function(index, item){
                if(index === stepObject.itemList.length - 1) lastChild = true;
                if(self.data.stepItemCount === 0) self.data.currentStepCode = item.code; // Keeping first slide code to global cache
                self.data.codeWithIndexMap[item.code] = self.data.stepItemCount;

                html += '<li class="common gap-2" data-index="'+ (self.data.stepItemCount++)
                           +'" data-code="'+ item.code +'" data-has-parent="true" data-last-child="'+ lastChild +'">'
                        + '<div class="d-flex pt-3">'
                        + self.getStatusIcon(self.data.stepStatus[item.code], true)
                        + '</div>'
                        + '<p class="status-bar-font clickable-steps">' + item.header + '</p>'
                        + '</li>';

            });

            html += '</ul>';
            html += '</div>';
            html += '</div>';

        }else{
            self.data.codeWithIndexMap[stepObject.code] = self.data.stepItemCount;
            html += '<div class="common clickable-steps" data-index="'+ (self.data.stepItemCount++) +'">'+ stepObject.header + '</div>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    },
    getStatusIcon: function(stepCode, isChild, firstItem){
        var self = this;
        let html = '';
        let wrapperDivClass = 'd-flex"';

        if(firstItem){
            html = '<i class="fa-solid fa-circle-dot fa-xl stepProgressIcon step-running"></i>';
        }else{
            if(stepCode === self.options.stepStatusCompleted){
                html = '<i class="fa-solid fa-circle-check fa-xl stepProgressIcon step-success"></i>';

            }else if(stepCode === self.options.stepStatusOngoing){
                if(isChild){
                    html = '<i class="fa-solid fa-circle-dot fa-xl stepProgressIcon step-success"></i>';
                }else{
                    html = '<i class="fa-solid fa-circle-dot fa-xl stepProgressIcon step-running"></i>';
                }

            }else if(stepCode === self.options.stepStatusUpcoming){
                html = '<i class="fa-solid fa-circle-dot fa-xl stepProgressIcon" style="color: #ced4da"></i>';

            }else{
                html = '<i class="fa-solid fa-circle-dot fa-xl stepProgressIcon" style="color: #ced4da"></i>';
            }
        }
        return '<div class="' + wrapperDivClass + '">' + html + '</div>';
    },
    getFormWrapperDiv: function(html){
        var self = this;
        return '<div class="d-flex flex-column w-100 bg-white rounded p-15 shadow companyRegistrationFormWrapper">'
               + '<form class="companyRegistrationForm">'
               + html
               + self.getButtonPanelHtml()
               + '</form>'
               + '</div>';
    },
    getButtonPanelHtml: function(){
        var self = this;
        return '<div class="row col-md-12 mt-5">'
               + '<div class="col-md-6 text-start">'
               + self.data.prevBtn
               + '</div>'
               + '<div class="col-md-6 text-end">'
               + self.data.nextBtn
               + '</div>'
               + '</div>';
    },
    fillCurrentPrevAndNextStep: function(currentCode){
        var self = this;
        self.data.lastVisitedStepCode = self.data.currentStepCode;
        self.data.currentStepCode = currentCode;
    },
    updateStepProgressIcon: function(){
        var self = this;
        let $steProgressBar = $("#step-progress-bar");
        let traverseStop = 0;
        let currentIndex = +self.data.codeWithIndexMap[self.data.currentStepCode];
            // Make current slide to 'step-running'
            $steProgressBar
                .find('i.stepProgressIcon')
                .removeClass('fa-circle-dot')
                .removeClass('step-running')
                .removeClass('step-success')
                .addClass('fa-circle-dot');

            // Make last visited step to 'step-running'
            $steProgressBar.find('i.stepProgressIcon').each(function(){
                let hasParent = $(this).closest('div.inner-div').attr('data-has-parent');
                let lastChild = $(this).closest('li.common').attr('data-last-child');
                let code = $(this).closest('div.inner-div').attr('data-code');
                let loopIndex = +$(this).closest('div.inner-div').attr('data-index');

                if(!code){
                    code = $(this).closest('li.common').attr('data-code');
                    hasParent = $(this).closest('li.common').attr('data-has-parent');
                    loopIndex = +$(this).closest('li.common').attr('data-index');
                }

                if (code === self.data.currentStepCode) { // current step
                    traverseStop = 1;
                    $(this).removeClass('fa-circle-check')
                        .removeClass('fa-circle-dot')
                        .removeClass('step-running')
                        .removeClass('step-success')
                        .addClass('fa-circle-dot')
                        .addClass('step-running')
                }

                if (traverseStop === 0) {
                    if(!hasParent && !lastChild){
                        $(this).removeClass('fa-circle-check')
                            .removeClass('fa-circle-dot')
                            .removeClass('step-running')
                            .removeClass('step-success')
                            .addClass('fa-circle-dot')
                            .addClass('step-running')
                    }else{
                        $(this).removeClass('fa-circle-check')
                            .removeClass('fa-circle-dot')
                            .removeClass('step-running')
                            .removeClass('step-success')
                            .addClass('fa-circle-check')
                            .addClass('step-success')

                        if(hasParent === 'true' && lastChild === 'true'){
                            if(currentIndex > loopIndex){
                                $(this).closest('div.inner-div')
                                    .find('i.stepProgressIcon:first-child')
                                    .removeClass('fa-circle-check')
                                    .removeClass('fa-circle-dot')
                                    .removeClass('step-running')
                                    .removeClass('step-success')
                                    .addClass('fa-circle-check')
                                    .addClass('step-success')
                            }
                        }
                    }
                }
            });
        // }
    },
    setContentMaxHeight: function(){
        $('.companyRegistrationFormWrapper')
            .css('height', $(window).height() - 150)
            .css('overflow-y', 'auto')
        $('#step-progress-bar').css('height', $(window).height() - 150);
    },
    destroy: function () {
    }
});