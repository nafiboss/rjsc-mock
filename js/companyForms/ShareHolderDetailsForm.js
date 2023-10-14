class ShareHolderDetailsForm extends BaseForm {
  header = '';
  subHeader = '';
  shareholderCounter = 1;
  shareHolderList = [];
  shareHolderTypeList = [
      {'id': 'LOCAL_INDIVIDUAL', 'name': 'Local Individual'},
      {'id': 'LOCAL_CORPORATE', 'name': 'Local Corporate'},
      {'id': 'FOREIGN_INDIVIDUAL', 'name': 'Foreign Individual'},
      {'id': 'FOREIGN_CORPORATE', 'name': 'Foreign Corporate'}
  ];
  shareHolderType = '';
  localOrForeign = '';
  stateOwnOrPrivate = '';
  formClassName = 'shareHolderDetailsForm';
  shareHolderDetailsForm = 'shareholder-details-form';
  addShareHolderBtnClassName = 'addShareHolderBtn';
  confirmShareHolderBtnClassName = 'confirmShareHolderBtn';
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
        + '             <div class="d-flex flex-column mb-4 shareHolderListWrapperDiv">'
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
            "name": self._getElementByClass('name').val() ,
            "type": self.shareHolderType + " " + self.localOrForeign,
            "noOfShare": 15
          }
          );
      self._reloadShareHolderTable();
      self._getElementByClass('personDetailsModal').modal('hide');
    });

    $(document).on('click', '.'+ this.addShareHolderBtnClassName, function(){
      self._getElementByClass('personDetailsModal').modal('show');
    });

    $(document).on('click', '.modalCloseBtn', function(){
      self._getElementByClass('personDetailsModal').modal('hide');
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
        self._getElementByClass('nid-passport').hide();
        if(self.shareHolderType == "LOCAL_INDIVIDUAL") {
          self._getElementByClass('nid-passport.local').show(300);
        } else if (self.shareHolderType == "FOREIGN_INDIVIDUAL") {
          self._getElementByClass('nid-passport.foreign').show(300);  
        }
        
    });

    $(document).on('change', '.nid-passport', function(){
      self._getElementByClass('shareholder-details-form').show(300);
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

    html += '<div class="modal fade personDetailsModal" tabindex="-1" role="dialog" aria-hidden="true">'
        + '<div class="modal-dialog modal-xl" role="document">'
        + '<div class="modal-content">'
        + '<div class="modal-header p-4">'
        + '<div class="modal-title" id="exampleModalLabel">'
        + '<button type="button" class="close modal-btn modalCloseBtn" data-dismiss="modal" aria-label="Close">'
        + '<span aria-hidden="true">&times;</span>'
        + '</button>'
        + '<h5 class="bold">Particulars of individual Subscriber/Director/Manager/Managing Agent</h5>'
        + '<h6 class="gray">(as of memorandum of Articles of Association, Form-IX, X, XII)</h6>'
        + '</div>'
        + '</div>'
        + '<div class="modal-body p-4" style="height: 700px; overflow-y: scroll;">'
        + '<div class="shareHolderWrapper p-3">'

        + '<div class="d-flex gray-bg p-2 w-100 justify-content-between">'
        + '   <span class="all-label">Applicant Type</span>'
        + '</div>'

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
        + '         </div>'
        + '   </div>'
        + '   <div class="col-md-6 nid-passport local" style="display:none">'
        + '             <div class="d-flex flex-column w-100 mb-3">'
        + "                 <label class='form-label font-label'>National ID<span class='red'>*</span></label>"
        + '                 <input type="text" class="plc reg-form-input form-control nationalIdOrPassport" placeholder="Enter your national id"/>'
        + '             </div>'
        + '   </div>'
        + '   <div class="col-md-6 nid-passport foreign" style="display:none">'
        + '             <div class="d-flex flex-column w-100 mb-3">'
        + "                 <label class='form-label font-label'>Passport No.<span class='red'>*</span></label>"
        + '                 <input type="text" class="plc reg-form-input form-control nationalIdOrPassport" placeholder="Enter your Passport no"/>'
        + '             </div>'
        + '   </div>'    
        + '<div class="shareholder-details-form" style="display: none;">'
        + '    <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
        + '        <span class="all-label">Basic Information</span>'
        + '    </div>'
        + '    <div class="row p-4">' 
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column mb-3">'
        + '                 <label class="form-label font-label">1. Name <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control name" placeholder="Enter your name"/>'
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
        + '             <div class="d-flex flex-column w-100 mb-3">'
        + "                 <label class='form-label font-label'>9. Date of Birth<span class='red'>*</span></label>"
        + '                 <input type="date" name="dob" class="dob form-control plc" placeholder="Choose date of birth"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex nid-passport local flex-column w-100 mb-3" style="display:none!important">'
        + "                 <label class='form-label font-label'>10. TIN(XXXXXXXXXXXXXXX) (If Required)<span class='red'>*</span></label>"
        + '                 <input type="text" class="plc reg-form-input form-control tin" placeholder="Enter your TIN"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-3">'
        + "                 <label class='form-label font-label'>11. Upload your photo<span class='red'>*</span></label>"
        + '                 <input type="file" class="plc reg-form-input form-control"/>'
        + '             </div>'
        + '         </div>'
        + '        <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-3">'
        + "                 <label class='form-label font-label'>12. Upload scan copy of your signature<span class='red'>*</span></label>"
        + '                 <input type="file" class="plc reg-form-input form-control"/>'
        + '             </div>'
        + '         </div>'  

        + '<div class="d-flex gray-bg p-2 w-100 justify-content-between">'
        + '   <span class="all-label">Usual Residential Address</span>'
        + '</div>'
        + '    <div class="row p-4">'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">1. Division <span class="red">*</span></label>'
        + Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                  <label class="form-label font-label">2. District <span class="red">*</span></label>'
        + Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">3. Upojela/Thana <span class="red">*</span></label>'
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
        + '                 <label class="form-label font-label">1. Division <span class="red">*</span></label>'
        + Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                  <label class="form-label font-label">2. District <span class="red">*</span></label>'
        + Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">3. Upojela/Thana <span class="red">*</span></label>'
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
        + '<button type="button" class="btn btn-primary '+ this.confirmShareHolderBtnClassName +'">Add shareholder</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'

    return html;
  }
  _reloadShareHolderTable(){
    this._getElementByClass('shareHolderListWrapperDiv').html(this._createShareHolderTable());
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
      html += '<th>No of Share</th>';
      html += '<th>Direcrtor</th>';
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
        html += '<td><input type="checkbox" class="form-control form-check-input" style="height:2em;"/></td>';
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
      html += '<div class="emptyListMsgDiv">No share holder added.</div>';
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