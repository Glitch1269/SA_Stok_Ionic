import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Item } from '../models/Item';
import { Kayit } from '../models/kayit';
import { Sonuc } from '../models/Sonuc';

import { StockServiceService } from '../services/stockService.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  item !: Item;
  items !: Item[];
  isModalOpen = false;
  yeniItem: Item[] = [];
  
  itemEkle: FormGroup = new FormGroup({
    itemAdi: new FormControl(),
    itemMiktar: new FormControl(),
   
  });

  constructor(private stockService  : StockServiceService ) {}
ngOnInit(){
  this.ItemListe();
}
    ItemListe(){
    this.stockService.ItemListele().subscribe((d : any) =>{
      this.items = d;
      console.log(d);
    });}
    itemyaz(){
      console.log("this.item.itemAdi");
    }
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
    // Sil(item: Item )  {
    //   this.stockService.ItemSil(item).then(() => {
    //     var s: Sonuc = new Sonuc();
    //     s.islem = true;
    //     s.mesaj = "İtem Silindi";
     
    //   });
    // }
    Kaydet() {
      console.log(this.itemEkle.value);
      this.stockService.ItemEkle(this.itemEkle.value).subscribe(() => {
        var s: Sonuc = new Sonuc();
        s.islem = true;
        s.mesaj = "Item Eklendi";
        console.log(s);  
      });
    }
    Console(){
      console.log("deneme");
    }
    
}
