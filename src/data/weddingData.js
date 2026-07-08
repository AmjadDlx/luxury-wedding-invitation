import myPhoto from '../assets/images/bride.png';
import myPhoto1 from '../assets/images/groom.png';
import myPhoto2 from '../assets/images/together.jpg';
import myPhoto3 from '../assets/images/sample.jpg';
// import myPhoto4 from '../assets/images/sample1.jpg';
import myPhoto5 from '../assets/images/sample2.jpg';

export const weddingData = {
  couple: {
    bride: 'Ameen',
    groom: 'Liyana',
    intro:
      'Ameen and Liyana bring together quiet grace, warm humor, and a love that feels both effortless and enduring.',
    profiles: [
      {
        key: 'bride',
        name: 'Liyana',
        role: 'Bride',
        quote: 'Every love story is beautiful.',
        image: myPhoto,
        imageAlt: 'Elegant portrait placeholder for Ameen, the bride',
        details: [
          { label: 'Favorite Flower', value: 'White Gardenia', icon: 'flower' },
          { label: 'Favorite Place', value: 'Lake Como', icon: 'place' },
          { label: 'Favorite Memory', value: 'A golden-hour walk', icon: 'memory' },
        ],
      },
      {
        key: 'groom',
        name: 'Ameen',
        role: 'Groom',
        quote: 'And this one is my favorite.',
        image: myPhoto1,
        imageAlt: 'Elegant portrait placeholder for Liyana, the groom',
        details: [
          { label: 'Favorite Flower', value: 'Olive Blossom', icon: 'flower' },
          { label: 'Favorite Place', value: 'The Amalfi Coast', icon: 'place' },
          { label: 'Favorite Memory', value: 'The proposal night', icon: 'memory' },
        ],
      },
    ],
  },
  date: '2026-12-20T17:00:00+05:30',
  displayDate: 'December 20, 2026',
  venue: {
    name: 'Royal Garden Hall',
    intro: {
      eyebrow: 'The Venue',
      title: ['Where', 'Our Forever', 'Begins.'],
      description:
        'A destination wrapped in garden light, quiet architecture, and the kind of atmosphere made for unhurried celebration.',
    },
    address: '123 Celebration Avenue',
    city: 'Your City',
    mapsUrl:
      'https://www.google.com/maps?q=Royal%20Garden%20Hall%20123%20Celebration%20Avenue&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Royal%20Garden%20Hall%20123%20Celebration%20Avenue',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ameen%20%26%20Liyana%20Wedding&dates=20261220T113000Z/20261220T173000Z&details=Join%20Ameen%20and%20Liyana%20at%20Royal%20Garden%20Hall&location=Royal%20Garden%20Hall%2C%20123%20Celebration%20Avenue%2C%20Your%20City',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Elegant garden wedding venue with warm lights and refined architecture',
    ceremonyTime: '5:00 PM',
    receptionTime: '7:30 PM',
    parking: 'Complimentary valet will be available at the garden entrance.',
    dressCode: 'Black tie invited in soft neutrals, champagne tones, and classic eveningwear.',
  },
  hero: {
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85',
    subtitle: 'Invite you to celebrate their wedding',
  },
  audio: {
    enabled: true,
    autoplay: false,
    volume: 0.35,
    track: '/audio/wedding-theme.mp3',
  },
  story: [
    {
      year: '2019',
      title: 'First Meeting',
      description:
        'A slow afternoon, two cups of coffee, and the kind of conversation that made time feel generous.',
      icon: 'coffee',
    },
    {
      year: '2020',
      title: 'First Adventure',
      description:
        'They chased mountain air, golden light, and the first feeling that forever might have a beginning.',
      icon: 'mountain',
    },
    {
      year: '2023',
      title: 'The Proposal',
      description:
        'Under a sky full of soft light, one question turned every ordinary tomorrow into something sacred.',
      icon: 'ring',
    },
    {
      year: '2026',
      title: 'Forever Begins',
      description:
        'Surrounded by love, they step into the promise they have been writing together all along.',
      icon: 'infinity',
    },
  ],
  countdown: {
    intro:
      'Join Ameen and Liyana for an evening of vows, candlelight, music, and the beginning of their forever.',
    details: [
      {
        title: 'Ceremony',
        description:
          'An intimate vow exchange surrounded by ivory florals and soft afternoon light.',
        time: '5:00 PM',
        icon: 'ceremony',
      },
      {
        title: 'Reception',
        description:
          'Dinner, champagne, and dancing beneath a warm canopy of golden light.',
        time: '7:00 PM',
        icon: 'reception',
      },
      {
        title: 'Dress Code',
        description:
          'Black tie invited. Soft neutrals, champagne tones, and classic eveningwear.',
        time: 'Formal',
        icon: 'dress',
      },
    ],
  },
  galleryIntro: {
    eyebrow: 'Our Memories',
    title: ['Moments', "We'll Treasure", 'Forever.'],
    description:
      'A quiet collection of light, laughter, and the fleeting details that made their story feel timeless.',
  },
  gallery: [
    {
      id: 'gallery-01',
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
      alt: 'Bride and groom walking through a soft floral wedding aisle',
      height: 'tall',
    },
    {
      id: 'gallery-02',
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
      alt: 'Elegant wedding couple portrait in warm natural light',
      height: 'medium',
    },
    {
      id: 'gallery-03',
      src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85',
      alt: 'Luxury wedding table setting with candles and floral details',
      height: 'short',
    },
    {
      id: 'gallery-04',
      src: myPhoto2,
      alt: 'Wedding rings resting on an elegant invitation suite',
      height: 'medium',
    },
    // {
    //   id: 'gallery-05',
    //   src: myPhoto,
    //   alt: 'Romantic wedding couple silhouette during golden hour',
    //   height: 'tall',
    // },
    {
      id: 'gallery-06',
      src: myPhoto5,
      alt: 'Wedding ceremony chairs arranged beneath delicate floral decor',
      height: 'short',
    },
    {
      id: 'gallery-07',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      alt: 'Bride and groom embracing after their wedding ceremony',
      height: 'medium',
    },
    {
      id: 'gallery-08',
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85',
      alt: 'Bride holding a refined white floral bouquet',
      height: 'tall',
    },
    {
      id: 'gallery-09',
      src: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=85',
      alt: 'Champagne glasses and candlelight at a wedding reception',
      height: 'medium',
    },
    {
      id: 'gallery-10',
      src: myPhoto3,
      alt: 'Bride and groom sharing a quiet moment outdoors',
      height: 'short',
    },
    {
      id: 'gallery-11',
      src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85',
      alt: 'Elegant wedding reception details in ivory and gold tones',
      height: 'medium',
    },
    // {
    //   id: 'gallery-12',
    //   src: myPhoto4,
    //   alt: 'Wedding couple dancing beneath warm evening lights',
    //   height: 'tall',
    // },
  ],
  eventsIntro: {
    eyebrow: 'The Celebration',
    title: ['A Day', 'To Remember.'],
    description:
      'Join Ameen and Liyana for every beautifully considered moment, from the first toast to a slow Sunday farewell.',
  },
  events: [
    {
      id: 'event-01',
      title: 'Welcome Dinner',
      date: 'December 19, 2026',
      time: '7:00 PM',
      location: 'Royal Garden Hall',
      description:
        'An intimate candlelit dinner with family, close friends, champagne, and the first toast of the weekend.',
      icon: 'dinner',
    },
    {
      id: 'event-02',
      title: 'Wedding Ceremony',
      date: 'December 20, 2026',
      time: '5:00 PM',
      location: 'Royal Garden Hall',
      description:
        'A refined vow exchange framed by ivory florals, soft music, and the glow of late afternoon light.',
      icon: 'ceremony',
    },
    {
      id: 'event-03',
      title: 'Reception',
      date: 'December 20, 2026',
      time: '7:00 PM',
      location: 'Royal Garden Hall',
      description:
        'Dinner, dancing, and a warm evening of music beneath golden lighting and layered floral details.',
      icon: 'reception',
    },
    {
      id: 'event-04',
      title: 'Farewell Brunch',
      date: 'December 21, 2026',
      time: '10:30 AM',
      location: 'Royal Garden Terrace',
      description:
        'A relaxed morning gathering with coffee, pastries, and one last shared moment before guests depart.',
      icon: 'brunch',
    },
  ],
  rsvp: {
    intro: {
      eyebrow: 'Kindly Respond',
      title: ["We Can't Wait", 'To Celebrate', 'With You.'],
      description:
        'Your presence would mean the world to us. Please let us know if you will be joining the celebration.',
    },
    deadline: '2026-12-01',
    deadlineLabel: 'Please respond by December 1, 2026',
    contactEmail: 'hello@AmeenandLiyana.example',
    contactPhone: '+1 (555) 014-2026',
    submitLabel: 'Send RSVP',
    editLabel: 'Edit Response',
    loadingLabel: 'Sending',
    success: {
      title: 'Response Received',
      message:
        'Thank you for responding with such care. We cannot wait to celebrate this beautiful day with you.',
    },
    fields: {
      guestName: {
        label: 'Guest Name',
        placeholder: 'Your full name',
      },
      email: {
        label: 'Email',
        placeholder: 'you@example.com',
      },
      phone: {
        label: 'Phone Number',
        placeholder: '+1 (555) 000-0000',
        optionalLabel: 'optional',
      },
      guestCount: {
        label: 'Number of Guests',
        placeholder: '1',
      },
      attendance: {
        label: 'Attendance',
        options: [
          { value: 'accepts', label: 'Accepts with Pleasure' },
          { value: 'declines', label: 'Regretfully Declines' },
        ],
      },
      dietary: {
        label: 'Dietary Requirements',
        placeholder: 'Vegetarian, allergies, or anything we should know',
      },
      message: {
        label: 'Message for the Couple',
        placeholder: 'Share a note for Ameen and Liyana',
      },
    },
    validation: {
      guestName: 'Please enter your name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      guestCount: 'Please enter at least one guest.',
      attendance: 'Please choose your attendance.',
    },
  },
  finale: {
    eyebrow: 'Thank You',
    title: ['Your Presence', 'Will Make', 'Our Day Complete.'],
    description:
      'From the first note of the ceremony to the last shimmer of the evening, we are grateful to share this beginning with the people who mean the most to us.',
    closingNote:
      'We cannot wait to welcome you, hold you close, and celebrate a day made brighter by your presence.',
    signature: 'Ameen & Liyana',
    ctaLabel: 'See You Soon',
  },
}
