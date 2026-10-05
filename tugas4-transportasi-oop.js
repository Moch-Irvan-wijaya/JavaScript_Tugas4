// Tugas Pertemuan 4 - Sistem Manajemen Transportasi (OOP)

// CLASS KENDARAAN (parent class)
// dipakai sebagai dasar buat semua jenis kendaraan
class Kendaraan {
  constructor(merek, plat) {
    this.merek = merek;
    this.plat = plat;
  }

  // method info, nanti di-override sama class turunan
  info() {
    return this.merek + " (" + this.plat + ")";
  }
}

// CLASS MOBIL (child class)
// extends = mewarisi semua isi class Kendaraan
class Mobil extends Kendaraan {
  constructor(merek, plat, jumlahPintu) {
    super(merek, plat); // panggil constructor Kendaraan
    this.jumlahPintu = jumlahPintu; // properti khusus mobil
  }

  // override method info (isinya beda dari parent)
  info() {
    return "Mobil " + this.merek + " (" + this.plat + "), Pintu: " + this.jumlahPintu;
  }
}

// CLASS MOTOR (child class)
class Motor extends Kendaraan {
  constructor(merek, plat, tipe) {
    super(merek, plat);
    this.tipe = tipe; // properti khusus motor
  }

  // override method info
  info() {
    return "Motor " + this.merek + " (" + this.plat + "), Tipe: " + this.tipe;
  }
}

// CLASS BUS (child class)
class Bus extends Kendaraan {
  constructor(merek, plat, kapasitas) {
    super(merek, plat);
    this.kapasitas = kapasitas; // properti khusus bus
  }

  // override method info
  info() {
    return "Bus " + this.merek + " (" + this.plat + "), Kapasitas: " + this.kapasitas + " penumpang";
  }
}

// CLASS PELANGGAN
// properti: nama, nomorTelepon, kendaraanDisewa
class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = null; // null = belum menyewa kendaraan apa pun
  }

  // method buat mencatat transaksi penyewaan kendaraan
  sewaKendaraan(kendaraan) {
    // cek dulu, kalau masih menyewa tidak boleh sewa lagi
    if (this.kendaraanDisewa != null) {
      console.log("Transaksi gagal: " + this.nama + " masih menyewa kendaraan lain.");
    } else {
      this.kendaraanDisewa = kendaraan;
      console.log("Transaksi: " + this.nama + " menyewa " + kendaraan.info());
    }
  }

  // method buat mencatat pengembalian kendaraan
  kembalikanKendaraan() {
    if (this.kendaraanDisewa != null) {
      console.log("Transaksi: " + this.nama + " mengembalikan " + this.kendaraanDisewa.info());
      this.kendaraanDisewa = null; // balik lagi jadi tidak menyewa
    } else {
      console.log(this.nama + " tidak sedang menyewa kendaraan.");
    }
  }
}

// SISTEM: tampilkan pelanggan yang sedang menyewa
function tampilkanPelangganMenyewa(daftarPelanggan) {
  console.log("Daftar Pelanggan yang Sedang Menyewa:");
  let jumlah = 0;

  // cek satu-satu semua pelanggan
  for (let i = 0; i < daftarPelanggan.length; i++) {
    // kalau kendaraanDisewa tidak kosong berarti sedang menyewa
    if (daftarPelanggan[i].kendaraanDisewa != null) {
      jumlah++;
      console.log(
        jumlah + ". " + daftarPelanggan[i].nama +
        " | Telp: " + daftarPelanggan[i].nomorTelepon +
        " | Kendaraan: " + daftarPelanggan[i].kendaraanDisewa.info()
      );
    }
  }

  if (jumlah == 0) {
    console.log("Tidak ada pelanggan yang sedang menyewa.");
  }
  console.log("----------------------------------------");
}

// PROGRAM UTAMA

// buat objek kendaraan
let mobil1 = new Mobil("Toyota Avanza", "B 1923 UHH", 4);
let motor1 = new Motor("Honda Vario", "B 4289 MIW", "Matic");
let bus1 = new Bus("Hino", "B 3429 BRU", 30);

// buat objek pelanggan
let pelanggan1 = new Pelanggan("Irvan", "083295823134");
let pelanggan2 = new Pelanggan("Wijaya", "082135829313");
let pelanggan3 = new Pelanggan("Ilyas", "083493991831");
let pelanggan4 = new Pelanggan("Jhon", "085392390582");

// simpan semua pelanggan ke dalam array
let daftarPelanggan = [pelanggan1, pelanggan2, pelanggan3, pelanggan4];

// proses penyewaan
console.log("=== Transaksi Penyewaan ===");
pelanggan1.sewaKendaraan(mobil1);
pelanggan2.sewaKendaraan(motor1);
pelanggan3.sewaKendaraan(bus1);
pelanggan1.sewaKendaraan(motor1); // dicoba sewa lagi, harusnya gagal
console.log("----------------------------------------");

// tampilkan pelanggan yang sedang menyewa
tampilkanPelangganMenyewa(daftarPelanggan);

// Siti mengembalikan motor, lalu tampilkan lagi
console.log("=== Transaksi Pengembalian ===");
pelanggan2.kembalikanKendaraan();
console.log("----------------------------------------");
tampilkanPelangganMenyewa(daftarPelanggan);
