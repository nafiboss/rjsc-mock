class ShareHolderDetailsFormPartnership extends BaseForm {
    header = '';
    subHeader = '';
    shareholderCounter = 1;
    shareHolderList = [];
    shareHolderTypeList = [
        {'id': 'LOCAL_INDIVIDUAL', 'name': 'Local Individual'},
        {'id': 'FOREIGN_INDIVIDUAL', 'name': 'Foreign Individual'},
    ];
    shareHolderType = '';
    representativeAdded = false;
    localOrForeign = '';
    stateOwnOrPrivate = '';
    formClassName = 'nomineeDetailsForm';
    shareHolderDetailsForm = 'shareholder-details-form';
    addShareHolderBtnClassName = 'addShareHolderBtn';
    confirmShareHolderBtnClassName = 'confirmNomineeBtn';
    divisionSelectBoxClassName = 'divisionSelect';
    districtSelectBoxClassName = 'districtSelect';
    upazilaSelectBoxClassName = 'upazilaSelect';
  
    constructor(header, subHeader, shareHolderList) {
      super();
      console.log("SMNLOG :: Constructor : ShareHolderDetailsForm");
      console.log("SMNLOG :: shareHolderList:"+ JSON.stringify(shareHolderList));
      this.header = header;
      this.subHeader = subHeader;
      this.shareHolderList = shareHolderList;
    }
  
    getFormData(){
      return '';
    }
  
    getFormHtml() {
      let html = '<div class="rounded border border-color d-flex flex-column '+ this.formClassName +'">'
      html += super.getStepFormHeader(this.header);
  
      html +='     <div class="row p-4">'
          + '         <div class="d-flex justify-content-end pb-5 mr-2">'
          + '           <button type="button" class="btn btn-outline-success '+ this.addShareHolderBtnClassName +'"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Shareholder</button>'
          + '         </div>'
          + '         <div class="col-md-12">'
          + '             <div class="d-flex flex-column mb-4 nomineeListWrapperDiv">'
          +                   this._createShareHolderTable()
          + '             </div>'
          + '         </div>'
          + '     </div>'
          + this._createModalHtml()
          + '</div>'
          + '</div>';
  
      return html;
    }
  
    bindEvents() {
      var self = this;
  
      $(document).on('click', '.btnGroup', function(){
        let removeClassName = $(this).attr('data-remove-class');
        let addClassName = $(this).attr('data-add-class');
  
        $(this)
            .closest('div.btn-group')
            .find('button')
            .removeClass('active')
            .removeClass(addClassName)
            .addClass(removeClassName)
  
        $(this)
            .addClass('active')
            .addClass(addClassName);
  
        self._getElementByClass('localOrForeignWrapperDiv').show(300);
      });
  
      $(document).on('click', '.shareHolderTypeBtn', function(){
        self.shareHolderType = $(this).text();
      });
  
      $(document).on('click', '.localBtn', function(){
        console.log("SMNLOG :: local btn clicked....");
        self.localOrForeign = $(this).text();
        self._getElementByClass('shareholder-details-form').show(300);
        self._getElementByClass('ownershipTypeWrapperDiv').hide();
      });
  
      $(document).on('click', '.foreignBtn', function(){
        self.localOrForeign = $(this).text();
        self._getElementByClass('shareholder-details-form').hide();
        self._getElementByClass('ownershipTypeWrapperDiv').show(300);
      });
  
      $(document).on('click', '.'+ self.confirmShareHolderBtnClassName, function(){
        self.shareHolderList.push(
            {
              "id": self.shareholderCounter++ ,
              "name": self._getElementByClass('indiname').val() ,
              "type": self.shareHolderType + " " + self.localOrForeign,
              "noOfShare": 15
            }
            );
        self._reloadShareHolderTable();
        self._getElementByClass('personDetailsModalNominee').modal('hide');
        $('.modal').modal('hide');
        $('.shareHolderTypeSelect').val("0");
  
        self._getElementByClass('nid-passport').hide();
        self._getElementByClass('shareholder-details-form').hide();
        self._getElementByClass('entity-details-form').hide();
      });
  
      $(document).on('click', '.'+ this.addShareHolderBtnClassName, function(){
        self._getElementByClass('personDetailsModalNominee').modal('show');
      });
  
      $(document).on('click', '.modalCloseBtn', function(){
        self._getElementByClass('personDetailsModalNominee').modal('hide');
        $('.modal').modal('hide');
      });
  
      $(document).on('click', '.removeShareHolderItemBtn', function(){
        console.log("SMNLOG :: removeShareHolderItemBtn clicked.");
        let $that = this;
        let id = +$($that).attr('data-id');
  
        bootbox.confirm({
          message: "<b>Are you sure to delete this shareholder?</b>",
          buttons: {
            confirm: {
              label: "Yes",
              className: "btn-primary",
            },
            cancel: {
              label: "No",
              className: "btn-danger",
            },
          },
          callback: function (result) {
            if (result) {
              console.log("SMNLOG :: Delete confirmed...");
              console.log("SMNLOG old list::"+JSON.stringify(self.shareHolderList));
              self.shareHolderList = _.filter(self.shareHolderList, function(o) { return o.id !== id; });
              console.log("SMNLOG new list::"+JSON.stringify(self.shareHolderList));
              self._reloadShareHolderTable();
            }
          },
        });
      });
  
      $(document).on('change', '.shareHolderTypeSelect', function() {
          self.shareHolderType = $(this).val();
          self.representativeAdded = false;
  
          self._getElementByClass('nid-passport').hide();
          self._getElementByClass('shareholder-details-form').hide();
          self._getElementByClass('entity-details-form').hide();
          if(self.shareHolderType == "LOCAL_INDIVIDUAL") {
            self._getElementByClass('nid-passport.local').show(300);
            self._getElementByClass('nid-passport.local.corporate').hide();
            self._getElementByClass('nid-passport.foreign').hide();
          } else if (self.shareHolderType == "FOREIGN_INDIVIDUAL") {
            self._getElementByClass('nid-passport.foreign').show(300); 
            self._getElementByClass('nid-passport.foreign.corporate').hide(); 
            self._getElementByClass('nid-passport.local').hide();
          } else if(self.shareHolderType == "LOCAL_CORPORATE") {
            self._getElementByClass('nid-passport.local.corporate').show(300);
          } else if(self.shareHolderType == "FOREIGN_CORPORATE") {
            self._getElementByClass('nid-passport.foreign.corporate').show(300);
          }
          
      });
  
      $(document).on('change click', '.nid-passport', function(e){
        e.preventDefault();
  
        if(self.shareHolderType == "LOCAL_INDIVIDUAL" || self.shareHolderType == "FOREIGN_INDIVIDUAL" || self.representativeAdded) {
          self._getElementByClass('shareholder-details-form').show(300);
        } else {
          self._getElementByClass('entity-details-form').show(300);
        }
      });
  
      $(document).on('click', '.nid-passport.local-nid', function(e){
        e.preventDefault();
        $(this).hide();
        self.representativeAdded = true;
        self._getElementByClass('entity-details-form').hide();
        self._getElementByClass('shareholder-details-form').hide();
        self._getElementByClass('nid-passport.local').show(); 
        self._getElementByClass('nid-passport.local.corporate').hide();
        self._getElementByClass('nid-passport.foreign.corporate').hide();
      });
  
      $(document).on('change', '.divisionSelect', function(){
        Obrs.APP.updateDistrictSelect(
            $(this).val(),
            self._getDistrictElement()
        );
  
        Obrs.APP.makeSelectBoxEmpty(self._getUpazilaElement());
      });
  
      $(document).on('change', '.districtSelect', function(){
        Obrs.APP.updateUpazilaSelect(
            $(this).val(),
            self._getUpazilaElement()
        );
      });
    }
    _createModalHtml(){
      let html = '';
  
      // '<div class="row p-4">'
      // + '     <div class="col-md-12">'
      // + '         <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
      // + '            <span class="all-label">'+ subHeader +'</span>'
      // + '         </div>'
      // + '     </div>'
      // + ' </div>'
  
      html += '<div class="modal fade personDetailsModalNominee" tabindex="-1" role="dialog" aria-hidden="true">'
          + '<div class="modal-dialog modal-xl" role="document">'
          + '<div class="modal-content">'
          + '<div class="modal-header p-4">'
          + '<div class="modal-title" id="exampleModalLabel">'
          + '<button type="button" class="close modal-btn modalCloseBtn" data-dismiss="modal" aria-label="Close">'
          + '<span aria-hidden="true">&times;</span>'
          + '</button>'
          + '<h5 class="bold">Particulars of Shareholder</h5>'
          + '</div>'
          + '</div>'
          + '<div class="modal-body p-4" style="height: 700px; overflow-y: scroll;">'
          + '<div class="shareHolderWrapper p-3">'
          + '    <div class="row p-4">'
          + '         <div class="col-md-12">'
          + '             <div class="col-md-6 d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">Shareholder Type <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.shareHolderTypeList, 'shareHolderTypeSelect', '')
          // + '                 <div class="btn-group" role = "group">'
          // + '                    <button type="button" class="btn btn-sm btn-outline-primary btnGroup shareHolderTypeBtn" data-remove-class="btn-outline-primary" data-add-class="btn-primary">Individual</button>'
          // + '                    <button type="button" class="btn btn-sm btn-outline-primary btnGroup shareHolderTypeBtn" data-remove-class="btn-outline-primary" data-add-class="btn-primary">Corporate</button>'
          // + '                 </div>'
          + '             </div>'
          + '   <div class="col-md-6 nid-passport local" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>National ID<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control nationalIdOrPassport" placeholder="Enter your national id"/>'
          + '             </div>'
          + '            <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>Date of Birth<span class='red'>*</span></label>"
          + '                 <input type="date" name="dob" class="dob form-control plc" placeholder="Choose date of birth"/>'
          + '             </div>'
          + '   </div>'
          + '   <div class="col-md-6 nid-passport foreign" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>Passport No<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control nationalIdOrPassport" placeholder="Enter your passport no"/>'
          + '             </div>'
         +  '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>Date of Birth<span class='red'>*</span></label>"
          + '                 <input type="date" name="dob" class="dob form-control plc" placeholder="Choose date of birth"/>'
          + '             </div>'
          + '   </div>'
          + '         </div>'
          + '   </div>'
          + '<div class="entity-details-form" style="display: none;">'
          + '    <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '        <span class="all-label">Entity Basic Information</span>'
          + '    </div>'
          + '    <div class="row p-4">'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">1. Name <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control companyName" placeholder="Enter your entity name"/>'
          + '             </div>'
          + '         </div>'
          +  '        <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3"> &nbsp;'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">3. BIN/TIN no<span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Enter your BIN/TIN no"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>4. Upload scan copy of your Tax Identification Number (BIN/TIN)<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">5. Trade License no <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Enter your Trade License no"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>6. Upload scan copy of your Trade License<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">7. VAT Registration no <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Enter your VAT Registration no"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>8. Upload scan copy of your VAT Registration<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control"/>'
          + '             </div>'
          + '         </div>'
          + '<div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '   <span class="all-label">Entity Address</span>'
          + '</div>'
          + '    <div class="row p-4">'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label nid-passport local corporate">1. Division <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign corporate">1. Country <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local corporate">2. District <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign corporate">2. State <span class="red">*</span></label>'        
          + Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local corporate">3. Upojela/Thana <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign corporate">3. City <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.upazilaList, this.upazilaSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100">'
          + '                 <label class="form-label font-label">4. Post Code</label>'
          + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type post code"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">5. Enter your address</label>'
          + '                 <div class="form-floating">'
          + '                 <textarea class="plc form-control" placeholder="Type your address" id="floatingTextarea2"></textarea>'
          + '                 <label class="plc">Comments</label>'
          + '                 </div>'
          + '             </div>'
          + '         </div>'
          + '   <div class="col-md-6 nid-passport local corporate" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3"> &nbsp;'
          + '             </div>'
          + '   </div>'
          + '   <div class="col-md-6 nid-passport local corporate local-nid" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                 <br/><input type="button" class="btn-primary form-control nationalIdOrPassport" placeholder="Enter your Registration no" value="Add representative"></button>' 
          + '             </div>'
          + '   </div>'
          + '   <div class="col-md-6 nid-passport foreign corporate" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3"> &nbsp;'
          + '             </div>'
          + '   </div>'
          + '   <div class="col-md-6 nid-passport foreign corporate local-nid" style="display:none">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                 <br/><input type="button" class="btn-primary form-control nationalIdOrPassport" placeholder="Enter your Registration no" value="Add representative"></button>' 
          + '             </div>'
          + '   </div>'
          + '    </div>' 
          + '    </div>'
          + '</div>'
          + '<div class="shareholder-details-form" style="display: none;">'
          + '    <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '        <span class="all-label">Individaul Basic Information</span>'
          + '    </div>'
          + '    <div class="row p-4">' 
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">1. Name <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control indiname" placeholder="Enter your name"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                  <label class="form-label font-label">2. Former Name (if any) <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control formerName" placeholder="Enter your former name"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>3. Father's Name<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control fathersName" placeholder="Enter your fathers name"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>4. Mother's Name<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control mothersName" placeholder="Enter your mothers name"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>5. Phone/Mobile<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control phone" placeholder="Enter your Phone/Mobile no"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>6. Email<span class='red'>*</span></label>"
          + '                 <input type="email" class="plc reg-form-input form-control email" placeholder="Enter your email address"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>7. Nationality<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control nationality" placeholder="Nationality"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>8. Original Nationality if different</label>"
          + '                 <input type="text" class="plc reg-form-input form-control originalNationality" placeholder="Original Nationality"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="nid-passport local flex-column w-100 mb-3" style="display:none!important">'
          + "                 <label class='form-label font-label'>9. TIN(XXXXXXXXXXXXXXX) (If Required)<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control tin" placeholder="Enter your TIN"/>'
          + '             </div>'
          + '             <div class="nid-passport foreign flex-column w-100 mb-3" style="display:none!important">'
          + "                 <label class='form-label font-label'>9. Upload Scan copy of your passport<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control tin" placeholder="Enter your TIN"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>10. Upload your photo<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control"/>'
          + '             </div>'
          + '         </div>'
          + '        <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>11. Upload scan copy of your signature<span class='red'>*</span></label>"
          + '                 <input type="file" class="plc reg-form-input form-control"/>'
          + '             </div>'
          + '         </div>'
          + '<div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '   <span class="all-label">Usual Residential Address</span>'
          + '</div>'
          + '    <div class="row p-4">'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label nid-passport local">1. Division <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">1. Country <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local">2. District <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">2. State <span class="red">*</span></label>'        
          + Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local">3. Upojela/Thana <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">3. City <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.upazilaList, this.upazilaSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100">'
          + '                 <label class="form-label font-label">4. Post Code</label>'
          + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type post code"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">5. Enter your address</label>'
          + '                 <div class="form-floating">'
          + '                 <textarea class="plc form-control" placeholder="Type your address" id="floatingTextarea2"></textarea>'
          + '                 <label class="plc">Comments</label>'
          + '                 </div>'
          + '             </div>'
          + '         </div>'
          + '    </div>'
  
          + '<div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '   <span class="all-label">Permanent Address</span>'
          + '</div>'
          + '    <div class="row p-4">'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label nid-passport local">1. Division <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">1. Country <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local">2. District <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">2. State <span class="red">*</span></label>'        
          + Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label nid-passport local">3. Upojela/Thana <span class="red">*</span></label>'
          + '                 <label class="form-label font-label nid-passport foreign">3. City <span class="red">*</span></label>'
          + Obrs.APP.getCommonSelectBox(this.upazilaList, this.upazilaSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100">'
          + '                 <label class="form-label font-label">4. Post Code</label>'
          + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type post code"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">5. Enter your address</label>'
          + '                 <div class="form-floating">'
          + '                 <textarea class="plc form-control" placeholder="Type your address" id="floatingTextarea2"></textarea>'
          + '                 <label class="plc">Comments</label>'
          + '                 </div>'
          + '             </div>'
          + '         </div>'
          + '    </div>'
  
          + '    </div>'
          + '  </div>' // Form Wrapper div
          + '</div>'
          + '<div class="modal-footer">'
          + '<button type="button" class="btn btn-outline-danger modalCloseBtn" data-dismiss="modal">Close</button>'
          + '<button type="button" class="btn btn-primary '+ this.confirmShareHolderBtnClassName +'">Add Shareholder</button>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
  
      return html;
    }
    _reloadShareHolderTable(){
      this._getElementByClass('nomineeListWrapperDiv').html(this._createShareHolderTable());
    }
    _createShareHolderTable(){
      let html = '';
      if(this.shareHolderList.length > 0){
        html += '<table class="table table-hover">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>Sl#</th>';
        html += '<th>Name</th>';
        html += '<th>Type</th>';
        html += '<th>Capital Contributed (if any)</th>';
        html += '<th>Share of Profit (%)</th>';
        html += '<th></th>';
        html += '</tr>';
        html += '</thead>';
  
        html += '<thody>';
  
        $.each(this.shareHolderList, function(idx, item){
          html += '<tr>';
          html += '<td>'+ ( idx + 1 ) +'</td>';
          html += '<td>'+ item.name +'</td>';
          html += '<td>'+ item.type +'</td>';
          html += '<td><input type="text" class="form-control plc"/></td>';
          html += '<td><input type="text" class="form-control plc"/></td>';
          html += '<td>';
          html += '<button class="btn btn-sm btn-outline-success"><i class="fa fa-list me-1" data-id="'+ item.id +'"></i>View</button>';
          html += '<button class="btn btn-sm btn-outline-primary ms-1"><i class="fa fa-edit me-1" data-id="'+ item.id +'"></i>Edit</button>';
          html += '<button class="btn btn-sm btn-outline-danger ms-1 removeShareHolderItemBtn" data-id="'+ item.id +'"><i class="fa fa-trash  me-1"></i>Delete</button>';
          html += '</td>';
          html += '</tr>';
        });
  
        html += '</thody>';
        html += '</table>';
      }else{
        html += '<div class="emptyListMsgDiv">No Share holder added.</div>';
      }
      return html;
    }
    _getBaseElementForThisForm(){
      return $(document).find('div.'+this.formClassName);
    }
    _getElementByClass(className){
      return this._getBaseElementForThisForm().find('.' + className);
    }
    getEmptyJsonData() {
      return {
  
      }
    }
  
  }