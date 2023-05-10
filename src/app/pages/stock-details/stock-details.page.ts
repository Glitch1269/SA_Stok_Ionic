import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/Item';
import { StockServiceService } from 'src/app/services/stockService.service';
import { NavParams } from '@ionic/angular';
import { Sonuc } from 'src/app/models/Sonuc';
import { FormControl, FormGroup } from '@angular/forms';
import { Kategori } from 'src/app/models/Kategori';
@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.page.html',
  styleUrls: ['./stock-details.page.scss'],
})
export class StockDetailsPage implements OnInit {
  isModalOpen = false;
yenile : any;
items !: Item[];
selectedItem !: Item;
searchData : any;
kategoriler !: Kategori[];
selectedCategory !: Kategori;
katId !: string;
itemId !: string;
sonuc: Sonuc = new Sonuc(); 
itemEkle: FormGroup = new FormGroup({
  itemAdi: new FormControl(),
  itemMiktar: new FormControl(),
  itemKatTur: new FormControl(),
  itemKayitTarih : new FormControl(),
  itemDuzenlenmeTarih : new FormControl(),
});
  constructor(
    public stockService : StockServiceService,
    public route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.itemId = p['itemId'];
        this.ItemListele();
        // this.ItemListele();
      }
    });
  }
  
  
  ItemListele(){
    this.stockService.ItemById(this?.itemId).subscribe(( d : any) => { this.selectedItem = d; console.log(d); });  
}
KategoriListele(){
  this.stockService.KategoriById(this?.katId).subscribe(( d : any) => { this.selectedCategory = d; console.log(d); });
}

Console (){
  console.log("oldu")
}

Arttir(selectedItem : Item){
  selectedItem.itemMiktar += 1;
}
Azalt(selectedItem : Item){
  selectedItem.itemMiktar -= 1;
}

MiktarKaydet(selectedItem : Item){
  var tarih = new Date();
  selectedItem.itemDuzenlenmeTarih = tarih.getTime().toString();
  this.stockService.ItemDuzenle(selectedItem).subscribe(() => {
    this.sonuc.islem = true;
    this.sonuc.mesaj = "Miktar Değiştirildi !";
    this.ItemListele();
  })
}


Duzenle(selectedItem : Item,isOpen : boolean){
  this.isModalOpen = isOpen;
  var tarih = new Date();
  console.log(selectedItem);
      selectedItem.itemDuzenlenmeTarih = tarih.getTime().toString();
      this.stockService.ItemDuzenle(selectedItem).subscribe(() => {

        this.sonuc.islem = true;

        this.sonuc.mesaj = "Item Duzenle";

        this.ItemListele();
        
        this.isModalOpen = false;
      });
}
setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}


}
