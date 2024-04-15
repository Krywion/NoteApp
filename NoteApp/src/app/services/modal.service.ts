import {ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifier?: Subject<string>;

  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document) {
  }

  open(componentType: Type<any>, content: TemplateRef<any>, options: {size?: string; title?: string, data?: Note}) {
    const modalComponentFactory = this.resolver.resolveComponentFactory(componentType);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.note = options?.data;
    modalComponent.instance.closeEvent.subscribe(() =>
      this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() =>
      this.submitModal());


    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
