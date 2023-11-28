class UploadDocumentForm extends BaseForm {
    header = '';
    subHeader = '';
    shareHolderList = [];
    moaSectionList = [];
    datatableMsg = {};
    moaClauseTableObject = {};
    moaTypeList = [{'id': 'PRE_APPROVED', 'name': 'Deed of Agreement'}];
    formClassName = 'moaForm';
    moaSectionName = 'moaSectionSearchPanelSelect';
    moaDivisionName = 'moaDivisionSearchPanelSelect';
    moaGroupName = 'moaGroupSearchPanelSelect';
    moaClassName = 'moaClassSearchPanelSelect';
    moaSubClassName = 'moaSubClassSearchPanelSelect';
    businessObjectiveMoaSearchPanelUpdateBtnClassName = 'businessObjectiveMoaSearchPanelUpdateBtn';
    businessObjectiveMoaApplyBtnClassName = 'businessObjectiveMoaApplyBtn';
    businessObjectiveMoaSearchPanelClassName = 'businessObjectiveMoaSearchPanel';
    businessObjectiveMoaEditPanelClassName = 'businessObjectiveMoaEditPanel';
  
    constructor(header, subHeader, shareHolderList, datatableMsg, moaSectionList) {
      super();
      console.log("SMNLOG :: Constructor : MoaForm");
      console.log("SMNLOG :: moaSectionList:"+ JSON.stringify(moaSectionList));
      this.header = header;
      this.subHeader = subHeader;
      this.shareHolderList = shareHolderList;
      this.datatableMsg = datatableMsg;
      this.moaSectionList = moaSectionList;
    }
  
    getFormData(){
      return '';
    }
  
    getFormHtml() {
      let html = '<div class="rounded border border-color d-flex flex-column '+ this.formClassName +'">'
      html += super.getStepFormHeader(this.header);
  
      html += '     <div class="row p-4 pt-2">'
  
          + '         <div class="col-md-6 offset-md-3">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">1. Document Name<span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.moaTypeList, 'moaTypeSelect', '')
          + '             </div>'
          + '         </div>'
  
          + '        <div class="py-4 px-120 shadow bg-white customMoaWrapperDiv" style="display: none;">'
  
          + '        <div class="d-flex p-2 w-100 justify-content-between mb-4">'
          + '            <span class="all-label">Business Objective</span>'
          + '            <button type="button" class="btn btn-sm btn-outline-primary '+ this.businessObjectiveMoaSearchPanelUpdateBtnClassName +'"><i class="fa fa-edit"></i> Update</button>'
          + '            <button type="button" class="btn btn-sm btn-outline-primary '+ this.businessObjectiveMoaApplyBtnClassName +'" style="display: none;"><i class="fa fa-search"></i> Apply</button>'
          + '        </div>'
  
          + '        <div class="row '+ this.businessObjectiveMoaSearchPanelClassName +'">'
          + '        <div class="col-md-4">'
          + '             <div class="row col-md-12 mb-3">'
          + '                 <div class="col-md-4">1. Section</div>'
          + '                 <div class="col-md-8 font-weight-bold sectionLabel">Not selected</div>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-4">'
          + '             <div class="row col-md-12 mb-3">'
          + '                 <div class="col-md-4">2. Division</div>'
          + '                 <div class="col-md-8 font-weight-bold divisionLabel">Not selected</div>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-4">'
          + '             <div class="row col-md-12 mb-3">'
          + '                 <div class="col-md-4">3. Group</div>'
          + '                 <div class="col-md-8 font-weight-bold groupLabel">Not selected</div>'
          + '             </div>'
          + '         </div>'
          + '         </div>'
  
          + '        <div class="row '+ this.businessObjectiveMoaEditPanelClassName +'" style="display: none;">'
          + '        <div class="col-md-4">'
          + '             <div class="d-flex flex-column mb-3">'
          + '                 <label class="form-label font-label">1. Section <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.moaSectionList, this.moaSectionName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-4">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                  <label class="form-label font-label">2. Division <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox([], this.moaDivisionName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-4">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                 <label class="form-label font-label">3. Group <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox([], this.moaGroupName, '')
          + '             </div>'
          + '         </div>'
  /*        + '         <div class="col-md-4">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                 <label class="form-label font-label">4. Class <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox([], this.moaClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-4">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + '                 <label class="form-label font-label">5. Sub Class <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox([], this.moaSubClassName, '')
          + '             </div>'
          + '         </div>'*/
          + '       </div>'
  
          + '    <div class="row p-4">'
          + '       <div class="row col-md-12 moaClauseTableWrapperDiv">'
          + '          <table class="table moaClauseTable" style="width: 100%"></table>'
          + '       </div>'
          + '    </div>'
          + '    <div class="row p-4">'
          + '        <div class="col-md-6"></div>'
          + '        <div class="col-md-6 mb-3" style="text-align: right;">'
          + '           <label class="text-primary">You have selected (3) clauses. </label>'
          + '           <label class="text-primary text-underline font-weight-bold ms-3">Clear All</label>'
          + '           <button type="button" class="btn btn-primary ms-3 moaPreviewBtn">Preview MoA</button>'
          + '       </div>'
          + '    </div>'
          + this._createModalHtml()
  
          + '      </div>'
          + '      <div class="py-4 px-120 shadow bg-white modelMoaWrapperDiv text-align-center" style="display: none;">'
          + '      <img src="/images/sampleMoa/moa-01.png" class="moaImg"/>'
          + '      <img src="/images/sampleMoa/moa-02.png" class="moaImg"/>'
          + '      <img src="/images/sampleMoa/moa-03.png" class="moaImg"/>'
          + '      <img src="/images/sampleMoa/moa-04.png" class="moaImg"/>'
          + '      </div>'
  
          + '      <div class="py-4 px-120 shadow bg-white preApprovedMoaWrapperDiv" style="display: none;">'
          + '         <div class="col-md-6 offset-md-3">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">* Scan Document <span class="red">*</span></label>'
          + '                 <input type="file" class="form-control preApprovedMoaFile" placeholder="Upload your pre approved Moa ">'
          + '             </div>'
          + '         </div>'
  
          + '         <div class="m-3 p-2 rounded border previewImgDiv text-align-center" style="display: none;">'
          + '               <img src="#" class="preApprovedMoaImgPreview w-100">'
          + '         </div>'
          + '      </div>'
          + '   </div>'
  
          + '</div>';
  
      return html;
    }
  
    bindEvents() {
      var self = this;
  
      $(document).on('click', '.moaClassCheckbox', function(){
        console.log("SMNLOG :: Clicked");
  
        if(!$(this).closest('tr').hasClass('active')){
          $(this).closest('tr').addClass('active');
        }else{
          $(this).closest('tr').removeClass('active');
        }
  
      });
  
      $(document).on('change', '.'+ this.moaSectionName, function(){
        self._getElementByClass('sectionLabel').text($(this).find('option:selected').text());
  
        Obrs.APP.updateBusinessDivisionSelect(
            $(this).val(),
            self._getElementByClass(self.moaDivisionName)
        );
      });
  
      $(document).on('change', '.'+ this.moaDivisionName, function(){
        self._getElementByClass('divisionLabel').text($(this).find('option:selected').text());
  
        Obrs.APP.updateBusinessGroupSelect(
            $(this).val(),
            self._getElementByClass(self.moaGroupName)
        );
      });
  
      $(document).on('change', '.'+ this.moaGroupName, function(){
        self._getElementByClass('groupLabel').text($(this).find('option:selected').text());
  
        Obrs.APP.updateBusinessClassSelect(
            $(this).val(),
            self._getElementByClass(self.moaClassName)
        );
  
        // reload table content
        self._reloadTable();
      });
  
      $(document).on('change', '.'+ this.moaClassName, function(){
        Obrs.APP.updateBusinessSubClassSelect(
            $(this).val(),
            self._getElementByClass(self.moaSubClassName)
        );
      });
  
      $(document).on('click', '.'+ this.businessObjectiveMoaSearchPanelUpdateBtnClassName, function(){
        console.log("SMNLOG :: Update Btn clicked...");
  
        self._getElementByClass(self.businessObjectiveMoaSearchPanelClassName).hide();
        self._getElementByClass(self.businessObjectiveMoaEditPanelClassName).show();
  
        self._getElementByClass(self.businessObjectiveMoaApplyBtnClassName).show();
        $(this).hide();
  
      });
  
      $(document).on('click', '.'+ this.businessObjectiveMoaApplyBtnClassName, function(){
        console.log("SMNLOG :: Apply Btn clicked...");
        self._getElementByClass(self.businessObjectiveMoaSearchPanelClassName).show();
        self._getElementByClass(self.businessObjectiveMoaEditPanelClassName).hide();
  
        self._getElementByClass(self.businessObjectiveMoaSearchPanelUpdateBtnClassName).show();
        $(this).hide();
  
      });
  
      self._getElementByClass('moaPreviewBtn').on('click', function (e) {
        console.log("SMNLOG :: ========== moaPreviewBtn =========");
        self._getElementByClass('moaPreviewModal').modal('show');
      });
  
      self._getElementByClass('modalCloseBtn').on('click', function (e) {
        console.log("SMNLOG :: ========== moaPreviewBtn =========");
        self._getElementByClass('moaPreviewModal').modal('hide');
      });
  
      $(document).on('keyup', '.datatableSearch', function(){
        console.log("SMNLOG :: Key up called...");
        self.moaClauseTableObject.search($(this).val()).draw();
      });
  
      $(document).on('change', '.moaTypeSelect', function () {
  
  
        if($(this).val() === 'MODEL'){
          self._getElementByClass('customMoaWrapperDiv').show();
          self._getElementByClass('preApprovedMoaWrapperDiv').hide();
          self._getElementByClass('modelMoaWrapperDiv').hide();
        }else if($(this).val() === 'CUSTOM'){
          //self._getElementByClass('modelMoaWrapperDiv').show();
          //self._getElementByClass('customMoaWrapperDiv').hide();
          //self._getElementByClass('preApprovedMoaWrapperDiv').hide();
        }else if($(this).val() === 'PRE_APPROVED'){
          self._getElementByClass('preApprovedMoaWrapperDiv').show();
          self._getElementByClass('customMoaWrapperDiv').hide();
          self._getElementByClass('modelMoaWrapperDiv').hide();
        }
      });
  
      $(document).on('change', '.preApprovedMoaFile', function (e) {
        console.log("SMNLOG :: File Changed...");
        self._getElementByClass('preApprovedMoaImgPreview').attr('src', URL.createObjectURL(e.target.files[0]));
        self._getElementByClass('previewImgDiv').show();
      });
  
      self._initDatatable();
    }
    _initDatatable(){
      var self = this;
      //initiating dataTable with configuration
      self.moaClauseTableObject = Obrs.APP.customDatatableConfigForMoaClause(
          ".moaClauseTable",
          self._getUrl(),
          self._getTableColumnDefinition(),
          function(){
            self._getElementByClass('dataTables_filter')
                .css({'width':'100%'})
                .html(
                ' <div class="input-group">'
                + '   <input type="search" class="form-control datatableSearch" placeholder="Type any keyword, title or description  of any Class/Subclass">'
                + '   <div class="input-group-append">'
                + '      <button class="btn btn-primary" type="button">Search</button>'
                + '   </div>'
                + ' </div>'
            );
          },
          function(){
            $(document).showMoreLessWidget({});
          }
      );
    }
    _reloadTable(){
      var self = this;
      console.log("SMNLOG :: -========= Reloading Moa class table with group id = "+ this._getElementByClass(this.moaGroupName).val());
  
      var table = $(".moaClauseTable").DataTable();
      table.ajax
          .url(self._getUrl())
          .load();
    }
    _getUrl () {
      var groupId = +this._getElementByClass(this.moaGroupName).val();
      var url = "./moa-clause-list.json";
      return url;
    }
    _getTableColumnDefinition(columnNames) {
      var self = this;
  
      return [
        {
          "sTitle": 'Action', "mData": null, "bSortable": false, "render": function (data) {
              return '<input type="checkbox" class="cursor-pointer moaClassCheckbox"/>';
          }
        },
        {"sTitle": 'Class ID', "mData": "className", "bSortable": true},
        {
          "sTitle": 'Class Description', "mData": null, "bSortable": false, "render": function (data) {
            return '<div class="more">' + data.classDescription+ '</div>';
          }
        },
        {
          "sTitle": 'Description Included', "mData": null, "bSortable": false, "render": function (data) {
            return '<div class="more">' + data.descriptionInclude+ '</div>';
          }
        },
        {
          "sTitle": 'Description Excluded', "mData": null, "bSortable": false, "render": function (data) {
            return '<div class="more">' + data.descriptionExclude+ '</div>';
          }
        },
        {"sTitle": 'Subclass ID', "mData": "subClassId", "bSortable": true},
        {"sTitle": 'Subclass Description', "mData": "subClassDescription", "bSortable": true}
      ];
    }
    _createModalHtml(){
      let html = '';
      html += '<div class="modal fade moaPreviewModal" tabindex="-1" role="dialog" aria-hidden="true">'
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
          + '<div class="modal-body p-4 pb-1" style="height: 700px; overflow-y: scroll;">'
          + '<div class="moaPreview">'
  
          + '<div class="moa-preview-form p-4 pt-0 rounded border">'
          + '    <div class="justify-content-center pt-3">'
          + '        <div class="all-label text-align-center">THE COMPANIES ACT, 1994</div>'
          + '        <div class="all-label text-align-center">( ACT XVIII OF 1994 )</div>'
          + '        <div class="all-label text-align-center">( A PRIVATE COMPANY LIMITED BY SHARES )</div>'
          + '        <div class="all-label text-align-center">MEMORANDUM OF ASSOCIATION</div>'
          + '    </div>'
          + '<table class="moa-preview-table mt-3">'
  
          + '<tr>'
          + '<td>1. </td>'
          + '<td>Growing of other non-perennial cropsThis class includes the growing of non-perennial crops not elsewhere classified. This class includes: - growing of swedes, mangolds, fodder roots, clover, alfalfa, sainfoin, maize and other grasses, forage kale and similar forage products - growing of beet seeds (excluding sugar beet seeds) and seeds of forage plants</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>2. </td>'
          + '<td>Growing of grapesThis class includes: - growing of wine grapes and table grapes in vineyards</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>3. </td>'
          + '<td>Growing of tropical and subtropical fruitsThis class includes the growing of tropical and sub-tropical fruit: such as avocados, babanas and plantains, dates, figs, mangoes, papayas, paineapples, other tropical and subtropical fruits (Guava, Kadbel, Jacfruit, Littchi, Sofeda).</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>4. </td>'
          + '<td>Growing of citrus fruitsThis class includes such as: - growing of citrus fruits such as: grapefruit and pomelo, lemons and limes , oranges, tangerines, mandarins and clementines, other citrus fruits, wood apple.</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>5. </td>'
          + '<td>Growing of beverage crops (Tea, coffee)This class includes: - growing of beverage crops: coffee, tea, maté, cocoa, other beverage crops</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>6. </td>'
          + '<td>Growing of spices, aromatic, drug and pharmaceutical cropsThis class includes: - growing of perennial and non-perennial spices and aromatic crops such as: pepper (piper spp.) green chilis and peppers (capsicum spp.), nutmeg, mace and cardamoms, anise, baidan and fennel, cinnamon (canella), cloves. Ginger, vanilla, hops, garlic, onion cassifa leaf, black curmin, mathi, jayan, coriander seed, curmin seed, other spices aromatic crops. - growing of drug and narcotic crops - growing of plants used primarily in perfumery, in pharamacy or for insecticidal, fungicidal or similar purposes.</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>7. </td>'
          + '<td>General trading, indenting, importing, procuring, exporting, buyingTo carry on the business of general trading, indenting, importing, procuring, exporting, buying, selling, distributing, retailing, exchanging, converting, altering, leasing, processing, or otherwise handling all types and kinds of goods and services and activities required and/or incidental for the attainment of the above objectives in Bangladesh and abroad.</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>8. </td>'
          + '<td>Growing of grapesThis class includes: - growing of wine grapes and table grapes in vineyards</td>'
          + '</tr>'
  
          + '<tr>'
          + '<td>9. </td>'
          + '<td>Partnership, Jointventure,take over or Amalgamate with any other company and also to take Loans from Bank/other Financial Institutions.To attain the business objectives company may enter into Partnership, Jointventure,take over or Amalgamate with any other company and also to take Loans from Bank/other Financial Institutions in such a manner as may company thinks fit.</td>'
          + '</tr>'
  
          + '</table>'
  
          + '    </div>'
          + '  </div>' // Form Wrapper div
          + '</div>'
          + '<div class="modal-footer">'
          + '<button type="button" class="btn btn-outline-warning modalCloseBtn" data-dismiss="modal"><i class="fa fa-download"></i>&nbsp;&nbsp;Download</button>'
          + '<button type="button" class="btn btn-primary">Generate MoA</button>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
  
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