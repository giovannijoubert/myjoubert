<template>
  <div id="venue">
    <h1 class="m-t-50">Ons Trou Naweek</h1>
    <p class="section-description m-b-25">
      Na agt jaar van saam droom kan ons nie meer wag om ons groot dag met al
      ons vriende en familie te deel nie
      <span class="emoji-reaction ">
        🥳
      </span>
    </p>
    <vs-row justify="center" class="m-b-25">
      <vs-col align="center" class="m-r-10 vs-xl-3 vs-lg-4 vs-md-6 m-b-25">
        <vs-card class="large-card" type="3">
          <template #title>
            <h3>Wanneer?</h3>
          </template>
          <template #img>
            <span class="emoji-reaction large">
              ⏰
            </span>
          </template>
          <template #text>
            <p class="m-t-5">
              Saterdag, 4 Desember 2021 <br />
              15:30 vir 16:00
            </p>
            <vs-button
              @click="addToCalendar()"
              floating
              class="mj-center m-t-25"
              ><i class="bx bx-calendar m-r-5"></i>Add to Calendar</vs-button
            >
          </template>
        </vs-card>
      </vs-col>
      <vs-col align="center" class="vs-xl-3 vs-lg-4 vs-md-6">
        <vs-card class="large-card" type="3">
          <template #title>
            <h3>Waar?</h3>
          </template>
          <template #img>
            <span class="emoji-reaction large">
              🗺️
            </span>
          </template>
          <template #text>
            <p class="m-t-5">
              Meulstroom Lodge in Bronkhorstspruit, Gauteng
            </p>
            <vs-button @click="openMaps()" class="mj-center m-t-25" floating>
              <i class="bx bx-map m-r-5"></i>Google Maps</vs-button
            >
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
    <MapsWidget mapsHeight="300px" />
    <h1 class="m-t-50">
      Maar...
      <span class="emoji-reaction medium">
        🤔
      </span>
    </h1>

    <p class="section-description m-b-25">
      Een dag het na hopeloos te min tyd geklink. <br />
      Daarom nooi ons jou na ’n hele <b>naweek</b> van:
    </p>

    <span class="emoji-reaction large m-b-25">
      🍔 🍻🥂☕ 🎉 🎶💃🕺
    </span>

    <p class="section-description m-b-25 m-t-10">
      Kom swem, ontspan en kuier saam met jou gesin / vriende / familie.
    </p>

    <vs-row justify="center" class="m-b-25">
      <vs-col class="vs-xl-3 vs-lg-4 vs-md-6">
        <vs-card align="center" class="large-card" type="3">
          <template #title>
            <h3>Die Naweek Troue™</h3>
          </template>
          <template #img>
            <span class="emoji-reaction large">
              😎
            </span>
          </template>
          <template #text>
            <p class="m-t-5">
              Vrydag, <b>3 Desember 2021</b> tot <br />
              Sondag, <b>5 Desember 2021</b>
            </p>
            <vs-button
              @click="addToCalendar()"
              floating
              class="mj-center m-t-25"
              ><i class="bx bx-calendar m-r-5"></i>Add to Calendar</vs-button
            >
          </template>
        </vs-card>
      </vs-col>
    </vs-row>

    <h1 class="m-t-50">
      Daar is:
    </h1>

    <vs-row justify="center">
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Swembad</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🤽
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Wildsplaas</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🦓
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Wilge Rivier</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🦦
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
    </vs-row>
    <vs-row justify="center">
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Kroeg</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            💰
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Snoepwinkel</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🍬
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Koffie Stasie</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            ☕
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
    </vs-row>
    <vs-row justify="center" class="m-b-25">
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Ginbar</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🍸
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Craft Beer Stasie</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🍻
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Live Musiek</h2>
        </template>
        <template #img>
          <span class="emoji-reaction medium">
            🎸
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
    </vs-row>

    <img
      class="image-card left"
      src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/images/meulstroom1.jpg"
    />
    <img
      class="image-card right"
      src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/images/meulstroom2.jpeg"
    />

    <h1 class="m-t-50">
      Ons gaan lekker eet
      <span class="emoji-reaction medium">
        🍽️
      </span>
    </h1>

    <p class="section-description m-b-25">
      Etes word in die restaurant, of by die onthaal bedien.
    </p>

    <vs-row justify="center">
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Vrydagaand</h2>
        </template>
        <template #img>
          <span class="emoji-reaction">
            🍗 🥗
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Saterdagoggend</h2>
        </template>
        <template #img>
          <span class="emoji-reaction">
            🥣 🍳 🥓
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>

      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Saterdagmiddag</h2>
        </template>
        <template #img>
          <span class="emoji-reaction">
            🧀 🫒
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
    </vs-row>
    <vs-row justify="center">
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Saterdagaand</h2>
        </template>
        <template #img>
          <span class="emoji-reaction">
            🍔 🌭 🍕 🌯
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
      <vs-card align="center" class="medium-card" type="3">
        <template #title>
          <h2>Sondagoggend</h2>
        </template>
        <template #img>
          <span class="emoji-reaction">
            🥣 🍳 🥓
          </span>
        </template>
        <template #text><p></p></template>
      </vs-card>
    </vs-row>

    <appLink
      iconType="mail"
      clickAction="vrae"
      title="Enige allergieë?"
      description="Laat weet ons!"
    />

    <h1 class="m-t-25">
      Belangrike Tye
      <span class="emoji-reaction medium">
        ⌚
      </span>
    </h1>

    <vs-card class="trou-program">
      <template #text>
        <vs-table>
          <template #tbody>
            <vs-tr>
              <vs-td>
                <h3>Vrydag</h3>
              </vs-td>
              <vs-tr>
                <vs-td>
                  16:00
                </vs-td>
                <vs-td>
                  Arriveer en kamers inboek
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  16:00 - 23:00
                </vs-td>
                <vs-td>
                  Kontantkroeg beskikbaar
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  19:00
                </vs-td>
                <vs-td>
                  Ete in Restaurant
                </vs-td>
              </vs-tr>
            </vs-tr>
          </template>
        </vs-table>
      </template>
    </vs-card>

    <vs-card class="trou-program">
      <template #text>
        <vs-table>
          <template #tbody>
            <vs-tr>
              <vs-td>
                <h3>Saterdag</h3>
              </vs-td>
              <vs-tr>
                <vs-td>
                  07:30 - 08:30
                </vs-td>
                <vs-td>
                  Koffie/tee en Beskuit
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  10:00
                </vs-td>
                <vs-td>
                  Brunch in Restaurant
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  12:00 - 23:00
                </vs-td>
                <vs-td>
                  Kontantkroeg beskikbaar
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  16:00
                </vs-td>
                <vs-td>
                  Ons Trou!
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  18:00
                </vs-td>
                <vs-td>
                  Partytjie tyd...
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  00:00
                </vs-td>
                <vs-td>
                  Bonfire buite
                </vs-td>
              </vs-tr>
            </vs-tr>
          </template>
        </vs-table>
      </template>
    </vs-card>

    <vs-card class="trou-program">
      <template #text>
        <vs-table>
          <template #tbody>
            <vs-tr>
              <vs-td>
                <h3>Sondag</h3>
              </vs-td>
              <vs-tr>
                <vs-td>
                  07:30 - 08:30
                </vs-td>
                <vs-td>
                  Koffie/tee en Beskuit
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  08:30 - 09:00
                </vs-td>
                <vs-td>
                  Ontruim kamers
                </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>
                  09:00
                </vs-td>
                <vs-td>
                  Brunch in Restaurant
                </vs-td>
              </vs-tr>
            </vs-tr>
          </template>
        </vs-table>
      </template>
    </vs-card>

    <appLink
      class="m-b-50"
      :whiteIcon="true"
      iconType="calendar"
      clickAction="rsvp"
      title="RSVP?"
      description="There's an app for that!"
    />
  </div>
</template>
<script>
import MapsWidget from '@/components/MapsWidget';
import appLink from '@/components/appLink';
export default {
  components: { MapsWidget, appLink },
  mounted() {
    this.updatePageView('venue_viewed');
  },
  methods: {
    addToCalendar() {
      window.open(
        'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211203T140000Z%2F20211205T100000Z&details=Na%20agt%20jaar%20van%20saam%20droom%20kan%20ons%20nie%20meer%20wag%20om%20ons%20groot%20dag%20met%20al%20ons%20vriende%20en%20familie%20te%20deel%20nie%20%F0%9F%A5%B3&location=Meulstroom%20Lodge&text=Christi%20%26%20Giovanni%20se%20Troue%20%F0%9F%8E%89'
      );
    },
    openMaps() {
      window.open('https://goo.gl/maps/mnYZceKBcNuTQka79');
    },
    love() {
      this.$vs.notification({
        color: 'primary',
        title: 'Awh shucks',
        text: 'We ❤️ you too!'
      });
    }
  }
};
</script>
<style lang="scss">
.trou-program {
  margin: 15px !important;
}
.trou-program .vs-card {
  max-width: 450px !important;
  margin: 0 auto !important;
}

.image-card {
  max-width: 80%;
  max-height: 300px;
  margin: 10px;
  box-shadow: 0 3px 15px 0 rgb(0 0 0 / 15%);
  border-radius: 15px;
  transition: transform 0.5s ease-in-out;
}

.image-card:hover {
  transform: scale(1.05);
  transition: transform 0.5s ease-in-out;
}

#venue {
  width: 100%;
}

#venue .vs-table__tr:hover .vs-table__td {
  background: rgba(var(--vs-gray-1), 0) !important;
}

#venue .large-card .vs-card__text p {
  font-size: 17px;
}

#venue .large-card .vs-card__title h3 {
  font-size: 22px;
}

#venue .large-card .vs-card__img {
  margin: 10px;
}

#venue .medium-card {
  padding: 10px;
  width: fit-content;
}

#venue .medium-card .vs-card {
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 60px;
  width: fit-content;
  padding: 15px;
}

#venue .medium-card .vs-card__text {
  padding: 0px !important;
}

#venue .medium-card .vs-card__title {
  padding: 0px !important;
}

#venue .medium-card h2 {
  font-size: 18px !important;
  font-weight: 600 !important;
}

.tallCard .vs-card__img {
  max-height: 350px;
}
</style>
