import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityInformation } from './activity-information.model';
import { ActivityInformationService } from './activity-information.service';
import { Customer, CustomerService } from '../customer';
import { Category, CategoryService } from '../category';

@Component({
  selector: 'page-activity-information-update',
  templateUrl: 'activity-information-update.html',
})
export class ActivityInformationUpdatePage implements OnInit {
  activityInformation: ActivityInformation;
  customers: Customer[];
  categories: Category[];
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    name: [null, []],
    sector: [null, []],
    typeOfActivity: [null, []],
    propertyType: [null, []],
    areaClass: [null, []],
    architectureType: [null, []],
    numberOfFloors: [null, []],
    features: [null, []],
    descriptionOfTheFeatures: [null, []],
    customer: [null, []],
    category: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private dataUtils: JhiDataUtils,
    private customerService: CustomerService,
    private categoryService: CategoryService,
    private activityInformationService: ActivityInformationService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.customerService.query().subscribe(
      (data) => {
        this.customers = data.body;
      },
      (error) => this.onError(error)
    );
    this.categoryService.query().subscribe(
      (data) => {
        this.categories = data.body;
      },
      (error) => this.onError(error)
    );
    this.activatedRoute.data.subscribe((response) => {
      this.activityInformation = response.data;
      this.isNew = this.activityInformation.id === null || this.activityInformation.id === undefined;
      this.updateForm(this.activityInformation);
    });
  }

  updateForm(activityInformation: ActivityInformation) {
    this.form.patchValue({
      id: activityInformation.id,
      name: activityInformation.name,
      sector: activityInformation.sector,
      typeOfActivity: activityInformation.typeOfActivity,
      propertyType: activityInformation.propertyType,
      areaClass: activityInformation.areaClass,
      architectureType: activityInformation.architectureType,
      numberOfFloors: activityInformation.numberOfFloors,
      features: activityInformation.features,
      descriptionOfTheFeatures: activityInformation.descriptionOfTheFeatures,
      customer: activityInformation.customer,
      category: activityInformation.category,
    });
  }

  save() {
    this.isSaving = true;
    const activityInformation = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.activityInformationService.update(activityInformation));
    } else {
      this.subscribeToSaveResponse(this.activityInformationService.create(activityInformation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ActivityInformation>>) {
    result.subscribe(
      (res: HttpResponse<ActivityInformation>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({
      message: `ActivityInformation ${action} successfully.`,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
    this.navController.navigateBack('/tabs/entities/activity-information');
  }

  previousState() {
    window.history.back();
  }

  async onError(error) {
    this.isSaving = false;
    console.error(error);
    const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
    toast.present();
  }

  private createFromForm(): ActivityInformation {
    return {
      ...new ActivityInformation(),
      id: this.form.get(['id']).value,
      name: this.form.get(['name']).value,
      sector: this.form.get(['sector']).value,
      typeOfActivity: this.form.get(['typeOfActivity']).value,
      propertyType: this.form.get(['propertyType']).value,
      areaClass: this.form.get(['areaClass']).value,
      architectureType: this.form.get(['architectureType']).value,
      numberOfFloors: this.form.get(['numberOfFloors']).value,
      features: this.form.get(['features']).value,
      descriptionOfTheFeatures: this.form.get(['descriptionOfTheFeatures']).value,
      customer: this.form.get(['customer']).value,
      category: this.form.get(['category']).value,
    };
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field, isImage) {
    this.dataUtils.loadFileToForm(event, this.form, field, isImage).subscribe();
  }

  compareCustomer(first: Customer, second: Customer): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackCustomerById(index: number, item: Customer) {
    return item.id;
  }
  compareCategory(first: Category, second: Category): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackCategoryById(index: number, item: Category) {
    return item.id;
  }
}
