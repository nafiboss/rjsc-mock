class ShareHolderPositionForm extends BaseForm {
  header = '';
  subHeader = '';
  shareHolderList = [];
  formClassName = 'shareHolderPositionForm';

  constructor(header, subHeader, shareHolderList) {
    super();
    console.log("SMNLOG :: Constructor : ShareHolderPositionForm");
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

    html += '     <div class="row p-4">'
        + '        <div class="d-flex gray-bg p-2 w-100 justify-content-between mb-4">'
        + '            <span class="all-label">Directors</span>'
        + '        </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">1. Directors <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonMultiSelectBox(this.shareHolderList, 'directorMultiSelect', '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6 minNoOfQuorumDiv" style="display: none;">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">2. Quorum of Board of Directors Meeting<span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Quorum of Board of Directors Meeting"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6 minNoOfQuorumDiv" style="display: none;">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">3. Quorum of AGM/EGM<span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Quorum of AGM/EGM"/>'
        + '             </div>'
        + '         </div>'
        + '        <div class="d-flex gray-bg p-2 w-100 justify-content-between mb-4">'
        + '            <span class="all-label">Chairman</span>'
        + '        </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">1. Chairman <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox(this.shareHolderList, 'chairmanSelect', '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">2. Duration <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Enter duration in years"/>'
        + '             </div>'
        + '         </div>'
        + '        <div class="d-flex gray-bg p-2 w-100 justify-content-between mb-4">'
        + '            <span class="all-label">Managing Directors</span>'
        + '        </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">1. Managing Directors <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonMultiSelectBox(this.shareHolderList, 'managingDirectorMultiSelect', '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">2. Duration <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Enter duration in years"/>'
        + '             </div>'
        + '         </div>'

        + '     </div>'
        + '</div>';

    return html;
  }

  bindEvents() {
    var self = this;

    $(document).on('click', '.shareHolderTypeBtn', function(){
      self.shareHolderType = $(this).text();
    });

    $('.directorMultiSelect').select2({
      multiple:true,
      placeholder: 'Select director, You can select multiple'
    });

    $('.directorMultiSelect').select2().attr('val', [1,2,3]);

    $('.managingDirectorMultiSelect').select2({
      multiple:true,
      placeholder: 'Select managing director, You can select multiple'
    });

    self._getBaseElementForThisForm('directorMultiSelect').on('select2:select', function (e) {
      var ids = self._getElementByClass('directorMultiSelect').val();
      self._decideMinNoOfQuorum(ids.length);
    });

    self._getBaseElementForThisForm('directorMultiSelect').on('select2:unselect', function (e) {
      var ids = self._getElementByClass('directorMultiSelect').val();
      self._decideMinNoOfQuorum(ids.length);
    });
  }
  _decideMinNoOfQuorum(directorListSize){
    if(directorListSize > 2){
      this._getElementByClass('minNoOfQuorumDiv').show();
    }else{
      this._getElementByClass('minNoOfQuorumDiv').hide();
    }
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