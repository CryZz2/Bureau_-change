<template>
  <div class="full-bg">
    <div class="main-table">
      <h1>Taux de change devises</h1>
      <div class="input-row">
        <span>Pour</span>
        <input v-model.number="montantXPF" type="number" />
        <span>XPF, vous pouvez acheter :</span>
      </div>
      <div class="tableau">
        <div
          class="devise"
          v-for="(devise, i) in devisesAffichees"
          :key="devise.code"
        >
          <div class="devise-left">
            <img :src="devise.flag" :alt="devise.nom" />
            <span class="devise-nom">{{ devise.nom }}</span>
          </div>
          <div class="devise-right">
            {{ (devise.rate * montantXPF).toFixed(2) }} <span class="devise-code">{{ devise.code }}</span>
          </div>
        </div>
      </div>
      <p>Dernière mise à jour : {{ dateMaj }}</p>
    </div>
  </div>
</template>

<script>
import { getRates } from '../services/api';


export default {
  data() {
    return {
      taux: {},
      montantXPF: 1000,
      dateMaj: '',
      intervalId: null
    };
  },
  computed: {
devisesAffichees() {
    const devises = [
      { code: 'AUD', nom: 'Australie', flag: 'https://flagcdn.com/32x24/au.png' },
      { code: 'NZD', nom: 'Nouvelle-Zélande', flag: 'https://flagcdn.com/32x24/nz.png' },
      { code: 'CAD', nom: 'Canada', flag: 'https://flagcdn.com/32x24/ca.png' },
      { code: 'USD', nom: 'États-Unis', flag: 'https://flagcdn.com/32x24/us.png' },
      { code: 'FJD', nom: 'Fidji', flag: 'https://flagcdn.com/32x24/fj.png' },
      { code: 'SGD', nom: 'Singapour', flag: 'https://flagcdn.com/32x24/sg.png' },
      { code: 'THB', nom: 'Thaïlande', flag: 'https://flagcdn.com/32x24/th.png' },
      { code: 'CHF', nom: 'Suisse', flag: 'https://flagcdn.com/32x24/ch.png' },
      { code: 'EUR', nom: 'Zone euro', flag: 'https://flagcdn.com/32x24/eu.png' },
      { code: 'GBP', nom: 'Royaume-Uni', flag: 'https://flagcdn.com/32x24/gb.png' },
      { code: 'JPY', nom: 'Japon', flag: 'https://flagcdn.com/32x24/jp.png' },
      { code: 'VUV', nom: 'Vanuatu', flag: 'https://flagcdn.com/32x24/vu.png' },
    ];
    return devises.map(d => ({
      ...d,
      rate: this.taux[d.code] || 0
    }));
  }
},
  methods: {
    async chargerTaux() {
      this.taux = await getRates();
      this.dateMaj = new Date().toLocaleString();
    }
  },
  mounted() {
    this.chargerTaux();
    this.intervalId = setInterval(this.chargerTaux, 3600000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

