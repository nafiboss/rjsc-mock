/**
 * Created by habib on 22/08/2023.
 */

Obrs = window.Obrs || {};

Obrs.APP = {
    PAGE_SIZE: 10,
    ROW_DISPLAY_GLOBAL: 10,
    GLOBAL_DATE_FORMAT: "MMM dd, yyyy hh:mm tt",
    GLOBAL_DATE_FORMAT_FOR_JAVA: "dd/MM/yyyy",
    GLOBAL_DATE_FORMAT_US: "MM/DD/YYYY",
    MAX_AUTOCOMPLETE_RESULT_SIZE: 10,
    MIN_TEXT_LENGTH_FOR_INPUT: 3,
    MAX_TEXT_LENGTH_FOR_INPUT: 150,
    PHONE_NUMBER_ALLOWED_DIGIT: 11,
    NID_MIN_DIGIT: 10,
    NID_MAX_DIGIT: 17,
    FLUSH_MSG_FADE_TIME: 5000,
    PASSWORD_MIN_LENGTH: 6,
    TOAST_SUCCESS_MSG_TYPE: 'success',
    TOAST_ERROR_MSG_TYPE: 'error',
    TOAST_WARNING_MSG_TYPE: 'warning',
    init: function (opts) {
        this.contextRoot = opts.contextRoot;
    },
    startLoading: function () {
        $(document).find("div.se-pre-con").show();
    },
    stopLoading: function () {
        $(document).find("div.se-pre-con").fadeOut("slow");
    },
    globalDataTableInitialization: function (tableIdOrCss, url, columns, sortArr, pageLength, callBack, rowsGroup, csvBtnLabel, createRow, showInfo) {
        // rowsGroup = [0, 5]
        var self = this;
        var inf = 'i';

        if(typeof showInfo === 'undefined'){
            if(!showInfo) inf = '';
        }

        var json = {
            // dom: '<"row"<"col-md-12" t>><"row" <"col-sm-12 col-md-12 d-flex justify-content-end" '+ inf +' p>>',
            dom: '<"row " <"col-sm-12 col-md-6" l><"col-sm-12 col-md-6"f>><"row" r<"col-md-12" t>><"row" <"col-sm-12 col-md-6" i><"col-sm-12 col-md-6"p>>',
            responsive: true,
            fixedHeader: true,
            columnDefs: [{responsivePriority: 1, targets: -1}, {responsivePriority: 2, targets: 0},],
            aLengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"],],
            pageLength: pageLength || Obrs.APP.ROW_DISPLAY_GLOBAL,
            iDisplayLength: Obrs.APP.ROW_DISPLAY_GLOBAL, // "dom": '<"top">rt<"bottom"ip><"clear">',
            language: {
                search: "", info: "_START_ - _END_ <font color='#898787'>of</font> _TOTAL_", paginate: {
                    first: "First",
                    last: "Last",
                    next: "<i class='fa fa-angle-right'></i>",
                    previous: "<i class='fa fa-angle-left'></i>",
                },
            },
            sPaginationType: "simple_numbers", // you can also give here 'simple','simple_numbers','full','full_numbers'
            oLanguage: {
                sSearch: "Search:",
            }, // "ajax": url,
            ajax: $.fn.dataTable.pipeline({
                url: url, pages: 6, // number of pages to cache
            }),
            processing: true,
            serverSide: true,
            searching: true,
            fnDrawCallback: function (settings) {
                if (typeof callBack == "function") {
                    callBack(settings);
                }
            },
            createdRow: function (row, aaData, dataIndex) {
                if (typeof createRow == "function") {
                    createRow(row, aaData, dataIndex);
                }
            },
            //colReorder: true,
            colReorder: {
                fixedColumnsRight: 1
            },
            aoColumns: columns,
            aaSorting: sortArr, //[[ 0, "asc" ],[ 1, "desc" ]] // Sort by first column descending
        };
        if (typeof rowsGroup != "undefined") {
            json["rowsGroup"] = rowsGroup;
        }
        var table = $(tableIdOrCss).DataTable(json);
        return table;
    },
    customDatatableConfigForMoaClause: function(tableIdOrCss, url, columns, callBack, showMoreLessCallBack){
        var json = {
            dom: '<"row " <"col-sm-12 col-md-6" i><"col-sm-12 col-md-6 mb-3"f>><"row" r<"col-md-12" t>>',
            responsive: true,
            fixedHeader: true,
            columnDefs: [{responsivePriority: 1, targets: -1}, {responsivePriority: 2, targets: 0},],
            aLengthMenu: [[-1], ["All"],],
            pageLength: -1,
            iDisplayLength: Obrs.APP.ROW_DISPLAY_GLOBAL, // "dom": '<"top">rt<"bottom"ip><"clear">',
            language: {
                info: "<div class='moa-class-count-info'>_TOTAL_ classes available</div>",
                infoEmpty: "<div class='moa-class-count-info'>No classes found</div>",
                search: ""
            },
            sPaginationType: "simple_numbers", // you can also give here 'simple','simple_numbers','full','full_numbers'
            ajax: $.fn.dataTable.pipeline({
                url: url, pages: 6, // number of pages to cache
            }),
            fnInitComplete: function (settings) {
                if (typeof callBack == "function") {
                    callBack(settings);
                }
            },
            fnDrawCallback: function (settings) {
                if (typeof showMoreLessCallBack == "function") {
                    showMoreLessCallBack(settings);
                }
            },
            processing: true,
            serverSide: true,
            searching: true,
            colReorder: {
                fixedColumnsRight: 1
            },
            aoColumns: columns,
        };
        var table = $(tableIdOrCss).DataTable(json);
        return table;
    },
    addDynamicFieldValidationByClassNameSelector: function (className, validationObject) {
        jQuery.validator.addClassRules(className, validationObject);
    },
    addAlphanumericFieldValidation: function () {
        $.validator.addMethod("alphanumeric", function(value, element) {
            return /^[a-zA-Z\. ]*$/.test(value);
        }, "Letters, numbers, and dot only please");
    },
    addOnlyBanglaInput: function () {
        $.validator.addMethod("banglaOnly", function(value, element) {
            // Use a regular expression to check if the input contains only Bangla characters
            var banglaRegex = /^[\u0980-\u09FF\s]+$/; // This regex matches most Bangla characters and spaces

            // Test the value against the regular expression
            return this.optional(element) || banglaRegex.test(value);
        }, "Please enter only Bangla characters.");
    },
    addSingleDotNoDoubleSpaceFieldValidation: function () {
        $.validator.addMethod("singleDotNoDoubleSpace", function(value, element) {
            return !(value.includes('..') || value.includes('  '));
        }, "No double dot and space please");
    },
    addOnlyLettersFieldValidation: function () {
        $.validator.addMethod("onlyLetters", function(value, element) {
            return /^[a-zA-Z]+$/i.test(value);
        }, "Letters only please");
    },
    addNotEmptyFieldValidation: function () {
        $.validator.addMethod("notEmpty", function(value, element) {
            return value.trim() !== "" && value.trim() !== ".";
        }, "Empty Value is not allowed");
    },
    addNidLengthValidation: function () {
        $.validator.addMethod("nidLength", function(value, element) {
            return value.length == Obrs.APP.NID_MIN_DIGIT || value.length == Obrs.APP.NID_MAX_DIGIT
        }, "");
    },
    addBdPhoneNumberValidation: function () {
        $.validator.addMethod("bdPhoneNumber", function(value, element) {
            return value.length == Obrs.APP.PHONE_NUMBER_ALLOWED_DIGIT
        }, "");
    },
    getCommonTextValidationJson: function(required, minLength, maxlength){
        return {
                required: required || true,
                minlength: minLength || Obrs.APP.MIN_TEXT_LENGTH_FOR_INPUT,
                maxlength: maxlength || Obrs.APP.MAX_TEXT_LENGTH_FOR_INPUT,
                alphanumeric: true,
                singleDotNoDoubleSpace : true
            }
    },
    getBanglaValidationJson: function(required, minLength, maxLength) {
        return {
            required: required || true,
            minlength: minLength || Obrs.APP.MIN_TEXT_LENGTH_FOR_INPUT,
            maxlength: maxLength || Obrs.APP.MAX_TEXT_LENGTH_FOR_INPUT,
            banglaOnly: true, // Custom validation rule to allow only Bangla characters
        };
    },
    getNumberValidationJson: function(required, minLength, maxlength){
        return {
            required: required || true,
            maxlength: minLength || Obrs.APP.MIN_TEXT_LENGTH_FOR_INPUT,
            minlength: maxlength || Obrs.APP.MAX_TEXT_LENGTH_FOR_INPUT,
            number: true
        }
    },
    showFlushMessage: function(messageType, msg){
        let iConClass = ''
        let alertClass = ''

        if(messageType === 'success'){
            iConClass = 'fa-circle-check';
            alertClass = 'success';
        }else if(messageType === 'error'){
            iConClass = 'fa-triangle-exclamation';
            alertClass = 'danger';
        }else if(messageType === 'warning'){
            iConClass = 'fa-triangle-exclamation';
            alertClass = 'warning';
        }else if(messageType === 'info'){
            iConClass = 'fa-circle-info';
            alertClass = 'info';
        }

        let html = '<div class="alert alert-'+ alertClass +'">'
             + '<i class="fa '+ iConClass +'"></i>'
             + msg
             + '<i class="fa fa-xmark float-end cursor-pointer removeFlushMsg"></i>'
             + '</div>'

        $(".flushMsgDiv").append(html);
        this.createFlushMsgAutoFadeOut();
    },
    createFlushMsgAutoFadeOut: function(){
        setTimeout(function (){
            $(".alert").each(function (item) {
                var that = this;
                $(that).animate({
                    opacity: 0
                }, 700, function () {
                    $(that).remove();
                });
            });
        }, Obrs.APP.FLUSH_MSG_FADE_TIME);
    },
    onlyEnglishValidation: function(txt){
        return /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/.test(txt);
    },
    minimumOneCharacterUppercaseValidation: function(txt){
        return txt.match(/[A-Z]/g);
    },
    minimumOneCharacterLowercaseValidation: function(txt){
        return txt.match(/[a-z]/g);
    },
    minimumOneNumberValidation: function(txt){
        return txt.match(/[0-9]/g);
    },
    generateOptionsForSelectBox: function(list, that, selectedValue){
        $(that).append(new Option(' -- Choose Any --', '', false, false))
        $.each(list, function(idx, item){
            $(that).append(new Option(item.name, item.id, false, selectedValue))
        });
    },
    makeSelectBoxEmpty: function(selectBox){
        $(selectBox).empty();
        $(selectBox).append(new Option(' -- Choose Any --', '', false, false))
    },
    getCommonSelectBox: function(list, className, selectedValue){
        console.log(list);
        var html = '<select class="form-select plc reg-form-input form-control '+ className +'">';
        html += '<option value="0">-- Choose Any --</option>';

        $.each(list, function(idx, item){
            html += '<option value="'+ item.id +'">'+ item.name +'</option>';
        });
        html += '</select>';
        return html;
    },
    getCommonMultiSelectBox: function(list, className, selectedValue){
        console.log(list);
        var html = '<select class="form-select plc reg-form-input form-control '+ className +' multiple>';
        html += '<option value="0">-- Choose Any --</option>';

        $.each(list, function(idx, item){
            html += '<option value="'+ item.id +'">'+ item.name +'</option>';
        });
        html += '</select>';
        return html;
    },
    updateDistrictSelect: function(divisionId, that){
        $(that).empty();
        Obrs.APP.startLoading();

        $.get('/getDistrictList', {divisionId: divisionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '');
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateUpazilaSelect: function(districtId, that){
        $(that).empty();
        Obrs.APP.startLoading();

        $.get('/getUpazilaList', {districtId: districtId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessDivisionSelect: function(sectionId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('/getBusinessDivisionList', {sectionId: sectionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessGroupSelect: function(divisionId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('/getBusinessGroupList', {divisionId: divisionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessClassSelect: function(groupId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('/getBusinessClassList', {groupId: groupId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessSubClassSelect: function(classId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('/getBusinessSubClassList', {classId: classId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    generateOptionsForSelectBox: function(list, that, selectedValue){
        $(that).append(new Option(' -- Choose Any --', '', false, false))
        $.each(list, function(idx, item){
            $(that).append(new Option(item.name, item.id, false, selectedValue))
        });
    },
    makeSelectBoxEmpty: function(selectBox){
        $(selectBox).empty();
        $(selectBox).append(new Option(' -- Choose Any --', '0', false, false))
    },
    getCommonSelectBox: function(list, className, selectedValue){
        console.log(list);
        var html = '<select class="form-select plc reg-form-input form-control '+ className +'">';
        html += '<option value="0">-- Choose Any --</option>';

        $.each(list, function(idx, item){
            html += '<option value="'+ item.id +'">'+ item.name +'</option>';
        });
        html += '</select>';
        return html;
    },
    updateDistrictSelect: function(divisionId, that){
        $(that).empty();
        Obrs.APP.startLoading();

        $.get('./getDistrictList.json', {divisionId: divisionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '');
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateUpazilaSelect: function(districtId, that){
        $(that).empty();
        Obrs.APP.startLoading();

        $.get('./getUpazilaList.json', {districtId: districtId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessDivisionSelect: function(sectionId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('./getBusinessDivisionList.json', {sectionId: sectionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessGroupSelect: function(divisionId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('./getBusinessGroupList.json', {divisionId: divisionId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessClassSelect: function(groupId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('./getBusinessClassList.json', {groupId: groupId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    },
    updateBusinessSubClassSelect: function(classId, that){
        $(that).empty();
        Obrs.APP.startLoading();
        $.get('/getBusinessSubClassList', {classId: classId}, function (list) {
            Obrs.APP.generateOptionsForSelectBox(list, that, '')
        }).then(function(){
        }).always(function(){
            Obrs.APP.stopLoading();
        });
    }
};

