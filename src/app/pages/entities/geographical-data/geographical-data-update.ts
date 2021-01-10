import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GeographicalData } from './geographical-data.model';
import { GeographicalDataService } from './geographical-data.service';
import { Customer, CustomerService } from '../customer';

@Component({
  selector: 'page-geographical-data-update',
  templateUrl: 'geographical-data-update.html',
})
export class GeographicalDataUpdatePage implements OnInit {
  geographicalData: GeographicalData;
  customers: Customer[];
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    state: [null, []],
    units: [null, []],
    district: [null, []],
    square: [null, []],
    realEstateNumber: [null, []],
    activityNumber: [null, []],
    areaOfTheRealEstate: [null, []],
    customer: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private customerService: CustomerService,
    private geographicalDataService: GeographicalDataService
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
    this.activatedRoute.data.subscribe((response) => {
      this.geographicalData = response.data;
      this.isNew = this.geographicalData.id === null || this.geographicalData.id === undefined;
      this.updateForm(this.geographicalData);
    });
  }

  updateForm(geographicalData: GeographicalData) {
    this.form.patchValue({
      id: geographicalData.id,
      state: geographicalData.state,
      units: geographicalData.units,
      district: geographicalData.district,
      square: geographicalData.square,
      realEstateNumber: geographicalData.realEstateNumber,
      activityNumber: geographicalData.activityNumber,
      areaOfTheRealEstate: geographicalData.areaOfTheRealEstate,
      customer: geographicalData.customer,
    });
  }

  save() {
    this.isSaving = true;
    const geographicalData = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.geographicalDataService.update(geographicalData));
    } else {
      this.subscribeToSaveResponse(this.geographicalDataService.create(geographicalData));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<GeographicalData>>) {
    result.subscribe(
      (res: HttpResponse<GeographicalData>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `GeographicalData ${action} successfully.`, duration: 2000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/geographical-data');
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

  private createFromForm(): GeographicalData {
    return {
      ...new GeographicalData(),
      id: this.form.get(['id']).value,
      state: this.form.get(['state']).value,
      units: this.form.get(['units']).value,
      district: this.form.get(['district']).value,
      square: this.form.get(['square']).value,
      realEstateNumber: this.form.get(['realEstateNumber']).value,
      activityNumber: this.form.get(['activityNumber']).value,
      areaOfTheRealEstate: this.form.get(['areaOfTheRealEstate']).value,
      customer: this.form.get(['customer']).value,
    };
  }

  compareCustomer(first: Customer, second: Customer): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackCustomerById(index: number, item: Customer) {
    return item.id;
  }
}
