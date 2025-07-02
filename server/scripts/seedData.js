require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Accelerator = require('../models/Accelerator');
const Incubator = require('../models/Incubator');
const MicroVC = require('../models/MicroVC');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Accelerator.deleteMany({});
    await Incubator.deleteMany({});
    await MicroVC.deleteMany({});

    // Seed Accelerators
    const accelerators = [
      {
        name: 'Techstars Bangalore',
        state: 'Karnataka',
        affiliation: 'Corporate',
        tags: ['Equity', 'Global'],
        application_status: 'Open',
        batch_frequency: 'Quarterly',
        equity_taken: '6%',
        funding_offered: '₹75L',
        duration_weeks: 13,
        total_startups_supported: 150,
        funded_startup_percent: 85,
        description: 'Global accelerator program helping startups scale rapidly.',
        website_url: 'https://www.techstars.com/accelerators/bangalore',
        sectors_supported: ['Fintech', 'SaaS', 'AI/ML', 'Healthtech']
      },
      {
        name: '100X.VC Accelerator',
        state: 'Maharashtra',
        affiliation: 'Independent',
        tags: ['Equity'],
        application_status: 'Open',
        batch_frequency: 'Bi-annual',
        equity_taken: '5%',
        funding_offered: '₹25L',
        duration_weeks: 12,
        total_startups_supported: 80,
        funded_startup_percent: 70,
        description: 'Early-stage accelerator focused on Indian startups.',
        website_url: 'https://100x.vc',
        sectors_supported: ['Fintech', 'Edtech', 'E-commerce']
      }
    ];

    // Seed Incubators
    const incubators = [
      {
        name: 'T-Hub',
        state: 'Telangana',
        affiliation: 'Govt-backed',
        tags: ['Infra', 'Grant'],
        application_status: 'Open',
        funding_offered: '₹10L',
        equity_taken: '0%',
        duration_weeks: 24,
        total_startups_supported: 200,
        funded_startup_percent: 60,
        startup_supporter_label: 'Early-stage tech startups',
        description: 'India\'s largest startup incubator supporting tech innovation.',
        website_url: 'https://t-hub.co',
        sectors_supported: ['AI/ML', 'IoT', 'Blockchain', 'Fintech']
      },
      {
        name: 'NASSCOM 10000 Startups',
        state: 'Pan-India',
        affiliation: 'Private',
        tags: ['Support'],
        application_status: 'Open',
        funding_offered: 'Mentorship',
        equity_taken: '0%',
        duration_weeks: 16,
        total_startups_supported: 500,
        funded_startup_percent: 40,
        startup_supporter_label: 'Tech startups across India',
        description: 'Platform connecting startups with corporates and investors.',
        website_url: 'https://10000startups.com',
        sectors_supported: ['Technology', 'SaaS', 'Enterprise']
      }
    ];

    // Seed MicroVCs
    const microvcs = [
      {
        name: 'Java Capital',
        location: 'Chennai',
        focus: 'Seed',
        cheque_size: '₹25L - ₹1Cr',
        sectors: ['Fintech', 'SaaS', 'B2B'],
        total_companies: 25,
        total_funding: '₹15Cr',
        description: 'Early-stage fund focused on B2B SaaS and fintech startups.',
        website_url: 'https://javacapital.in',
        email: 'hello@javacapital.in'
      },
      {
        name: 'Venture Catalysts',
        location: 'Mumbai',
        focus: 'Pre-seed',
        cheque_size: '₹10L - ₹50L',
        sectors: ['Edtech', 'Healthtech', 'Consumer'],
        total_companies: 40,
        total_funding: '₹20Cr',
        description: 'Angel network and incubator supporting early-stage startups.',
        website_url: 'https://venturecatalysts.in',
        email: 'invest@venturecatalysts.in'
      }
    ];

    await Accelerator.insertMany(accelerators);
    await Incubator.insertMany(incubators);
    await MicroVC.insertMany(microvcs);

    console.log('✅ Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();