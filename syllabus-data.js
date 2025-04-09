/**
 * Syllabus data for MHT CET 2025
 * Based on Maharashtra State Board Class XI and XII syllabus
 */

const SyllabusData = (function() {
    // Physics syllabus data
    const physics = {
        // Class 11 topics
        class11: [
            {
                id: 'p11-1',
                unit: 'Measurements',
                topics: [
                    { id: 'p11-1-1', name: 'Units and Measurements', weightage: 2 },
                    { id: 'p11-1-2', name: 'Errors in Measurements', weightage: 1 },
                    { id: 'p11-1-3', name: 'Dimensions', weightage: 2 }
                ]
            },
            {
                id: 'p11-2',
                unit: 'Scalars and Vectors',
                topics: [
                    { id: 'p11-2-1', name: 'Scalar and Vector Quantities', weightage: 1 },
                    { id: 'p11-2-2', name: 'Addition of Vectors', weightage: 2 },
                    { id: 'p11-2-3', name: 'Resolution of Vectors', weightage: 1 },
                    { id: 'p11-2-4', name: 'Vector Multiplication', weightage: 1 }
                ]
            },
            {
                id: 'p11-3',
                unit: 'Motion in a Straight Line',
                topics: [
                    { id: 'p11-3-1', name: 'Distance and Displacement', weightage: 1 },
                    { id: 'p11-3-2', name: 'Speed and Velocity', weightage: 2 },
                    { id: 'p11-3-3', name: 'Acceleration', weightage: 2 },
                    { id: 'p11-3-4', name: 'Equations of Motion', weightage: 3 },
                    { id: 'p11-3-5', name: 'Relative Motion', weightage: 1 }
                ]
            },
            {
                id: 'p11-4',
                unit: 'Projectile Motion',
                topics: [
                    { id: 'p11-4-1', name: 'Projectile Motion in a Plane', weightage: 2 },
                    { id: 'p11-4-2', name: 'Time of Flight', weightage: 1 },
                    { id: 'p11-4-3', name: 'Horizontal Range', weightage: 1 },
                    { id: 'p11-4-4', name: 'Maximum Height', weightage: 1 }
                ]
            },
            {
                id: 'p11-5',
                unit: 'Laws of Motion',
                topics: [
                    { id: 'p11-5-1', name: 'Newton\'s First Law', weightage: 1 },
                    { id: 'p11-5-2', name: 'Newton\'s Second Law', weightage: 2 },
                    { id: 'p11-5-3', name: 'Newton\'s Third Law', weightage: 1 },
                    { id: 'p11-5-4', name: 'Applications of Newton\'s Laws', weightage: 3 },
                    { id: 'p11-5-5', name: 'Friction', weightage: 2 }
                ]
            },
            {
                id: 'p11-6',
                unit: 'Work, Energy and Power',
                topics: [
                    { id: 'p11-6-1', name: 'Work Done by a Constant Force', weightage: 1 },
                    { id: 'p11-6-2', name: 'Kinetic Energy', weightage: 2 },
                    { id: 'p11-6-3', name: 'Potential Energy', weightage: 2 },
                    { id: 'p11-6-4', name: 'Work-Energy Theorem', weightage: 2 },
                    { id: 'p11-6-5', name: 'Conservation of Energy', weightage: 3 },
                    { id: 'p11-6-6', name: 'Power', weightage: 1 }
                ]
            },
            {
                id: 'p11-7',
                unit: 'Rotational Motion',
                topics: [
                    { id: 'p11-7-1', name: 'Angular Displacement', weightage: 1 },
                    { id: 'p11-7-2', name: 'Angular Velocity and Acceleration', weightage: 2 },
                    { id: 'p11-7-3', name: 'Torque and Angular Momentum', weightage: 2 },
                    { id: 'p11-7-4', name: 'Moment of Inertia', weightage: 2 },
                    { id: 'p11-7-5', name: 'Rolling Motion', weightage: 1 }
                ]
            },
            {
                id: 'p11-8',
                unit: 'Gravitation',
                topics: [
                    { id: 'p11-8-1', name: 'Universal Law of Gravitation', weightage: 2 },
                    { id: 'p11-8-2', name: 'Acceleration Due to Gravity', weightage: 2 },
                    { id: 'p11-8-3', name: 'Gravitational Potential Energy', weightage: 1 },
                    { id: 'p11-8-4', name: 'Escape Velocity', weightage: 1 },
                    { id: 'p11-8-5', name: 'Kepler\'s Laws', weightage: 1 },
                    { id: 'p11-8-6', name: 'Satellites', weightage: 1 }
                ]
            },
            {
                id: 'p11-9',
                unit: 'Mechanical Properties of Solids',
                topics: [
                    { id: 'p11-9-1', name: 'Elastic Behavior', weightage: 1 },
                    { id: 'p11-9-2', name: 'Stress and Strain', weightage: 1 },
                    { id: 'p11-9-3', name: 'Hooke\'s Law', weightage: 1 },
                    { id: 'p11-9-4', name: 'Young\'s Modulus', weightage: 1 },
                    { id: 'p11-9-5', name: 'Bulk Modulus', weightage: 1 },
                    { id: 'p11-9-6', name: 'Shear Modulus', weightage: 1 }
                ]
            },
            {
                id: 'p11-10',
                unit: 'Mechanical Properties of Fluids',
                topics: [
                    { id: 'p11-10-1', name: 'Pressure', weightage: 1 },
                    { id: 'p11-10-2', name: 'Pascal\'s Law', weightage: 1 },
                    { id: 'p11-10-3', name: 'Buoyancy', weightage: 1 },
                    { id: 'p11-10-4', name: 'Archimedes\' Principle', weightage: 1 },
                    { id: 'p11-10-5', name: 'Viscosity', weightage: 1 },
                    { id: 'p11-10-6', name: 'Surface Tension', weightage: 1 },
                    { id: 'p11-10-7', name: 'Bernoulli\'s Principle', weightage: 2 }
                ]
            },
            {
                id: 'p11-11',
                unit: 'Thermal Properties of Matter',
                topics: [
                    { id: 'p11-11-1', name: 'Temperature and Heat', weightage: 1 },
                    { id: 'p11-11-2', name: 'Thermal Expansion', weightage: 1 },
                    { id: 'p11-11-3', name: 'Specific Heat Capacity', weightage: 1 },
                    { id: 'p11-11-4', name: 'Calorimetry', weightage: 1 },
                    { id: 'p11-11-5', name: 'Latent Heat', weightage: 1 },
                    { id: 'p11-11-6', name: 'Heat Transfer', weightage: 1 }
                ]
            },
            {
                id: 'p11-12',
                unit: 'Thermodynamics',
                topics: [
                    { id: 'p11-12-1', name: 'Thermal Equilibrium', weightage: 1 },
                    { id: 'p11-12-2', name: 'Zeroth Law of Thermodynamics', weightage: 1 },
                    { id: 'p11-12-3', name: 'First Law of Thermodynamics', weightage: 2 },
                    { id: 'p11-12-4', name: 'Specific Heat Capacity', weightage: 1 },
                    { id: 'p11-12-5', name: 'Thermodynamic Processes', weightage: 2 },
                    { id: 'p11-12-6', name: 'Second Law of Thermodynamics', weightage: 1 },
                    { id: 'p11-12-7', name: 'Heat Engines', weightage: 1 }
                ]
            },
            {
                id: 'p11-13',
                unit: 'Kinetic Theory of Gases',
                topics: [
                    { id: 'p11-13-1', name: 'Equation of State', weightage: 1 },
                    { id: 'p11-13-2', name: 'Kinetic Theory of an Ideal Gas', weightage: 1 },
                    { id: 'p11-13-3', name: 'Degrees of Freedom', weightage: 1 },
                    { id: 'p11-13-4', name: 'Law of Equipartition of Energy', weightage: 1 },
                    { id: 'p11-13-5', name: 'Mean Free Path', weightage: 1 }
                ]
            },
            {
                id: 'p11-14',
                unit: 'Oscillations',
                topics: [
                    { id: 'p11-14-1', name: 'Simple Harmonic Motion', weightage: 2 },
                    { id: 'p11-14-2', name: 'Simple Pendulum', weightage: 1 },
                    { id: 'p11-14-3', name: 'Free, Forced and Damped Oscillations', weightage: 1 },
                    { id: 'p11-14-4', name: 'Resonance', weightage: 1 }
                ]
            },
            {
                id: 'p11-15',
                unit: 'Waves',
                topics: [
                    { id: 'p11-15-1', name: 'Transverse and Longitudinal Waves', weightage: 1 },
                    { id: 'p11-15-2', name: 'Speed of Waves', weightage: 1 },
                    { id: 'p11-15-3', name: 'Superposition Principle', weightage: 1 },
                    { id: 'p11-15-4', name: 'Standing Waves', weightage: 1 },
                    { id: 'p11-15-5', name: 'Beats', weightage: 1 },
                    { id: 'p11-15-6', name: 'Doppler Effect', weightage: 2 }
                ]
            }
        ],
        
        // Class 12 topics
        class12: [
            {
                id: 'p12-1',
                unit: 'Electrostatics',
                topics: [
                    { id: 'p12-1-1', name: 'Electric Charges', weightage: 1 },
                    { id: 'p12-1-2', name: 'Coulomb\'s Law', weightage: 2 },
                    { id: 'p12-1-3', name: 'Electric Field', weightage: 2 },
                    { id: 'p12-1-4', name: 'Electric Flux', weightage: 1 },
                    { id: 'p12-1-5', name: 'Gauss\'s Law', weightage: 2 },
                    { id: 'p12-1-6', name: 'Electric Potential', weightage: 2 },
                    { id: 'p12-1-7', name: 'Capacitance', weightage: 2 },
                    { id: 'p12-1-8', name: 'Dielectrics', weightage: 1 }
                ]
            },
            {
                id: 'p12-2',
                unit: 'Current Electricity',
                topics: [
                    { id: 'p12-2-1', name: 'Electric Current', weightage: 1 },
                    { id: 'p12-2-2', name: 'Drift Velocity', weightage: 1 },
                    { id: 'p12-2-3', name: 'Ohm\'s Law', weightage: 2 },
                    { id: 'p12-2-4', name: 'Electrical Resistance', weightage: 1 },
                    { id: 'p12-2-5', name: 'Resistivity', weightage: 1 },
                    { id: 'p12-2-6', name: 'Electrical Energy and Power', weightage: 1 },
                    { id: 'p12-2-7', name: 'Combination of Resistors', weightage: 2 },
                    { id: 'p12-2-8', name: 'Kirchhoff\'s Laws', weightage: 2 },
                    { id: 'p12-2-9', name: 'Wheatstone Bridge', weightage: 1 },
                    { id: 'p12-2-10', name: 'Potentiometer', weightage: 1 }
                ]
            },
            {
                id: 'p12-3',
                unit: 'Magnetic Effects of Current',
                topics: [
                    { id: 'p12-3-1', name: 'Magnetic Field', weightage: 1 },
                    { id: 'p12-3-2', name: 'Oersted\'s Experiment', weightage: 1 },
                    { id: 'p12-3-3', name: 'Biot-Savart Law', weightage: 2 },
                    { id: 'p12-3-4', name: 'Ampere\'s Law', weightage: 2 },
                    { id: 'p12-3-5', name: 'Force on a Current-Carrying Conductor', weightage: 1 },
                    { id: 'p12-3-6', name: 'Torque on a Current Loop', weightage: 1 },
                    { id: 'p12-3-7', name: 'Moving Coil Galvanometer', weightage: 1 },
                    { id: 'p12-3-8', name: 'Ammeter and Voltmeter', weightage: 1 }
                ]
            },
            {
                id: 'p12-4',
                unit: 'Magnetism',
                topics: [
                    { id: 'p12-4-1', name: 'Bar Magnet', weightage: 1 },
                    { id: 'p12-4-2', name: 'Magnetic Field Lines', weightage: 1 },
                    { id: 'p12-4-3', name: 'Earth\'s Magnetic Field', weightage: 1 },
                    { id: 'p12-4-4', name: 'Magnetic Properties of Materials', weightage: 1 },
                    { id: 'p12-4-5', name: 'Paramagnetism', weightage: 1 },
                    { id: 'p12-4-6', name: 'Diamagnetism', weightage: 1 },
                    { id: 'p12-4-7', name: 'Ferromagnetism', weightage: 1 }
                ]
            },
            {
                id: 'p12-5',
                unit: 'Electromagnetic Induction',
                topics: [
                    { id: 'p12-5-1', name: 'Magnetic Flux', weightage: 1 },
                    { id: 'p12-5-2', name: 'Faraday\'s Law', weightage: 2 },
                    { id: 'p12-5-3', name: 'Lenz\'s Law', weightage: 1 },
                    { id: 'p12-5-4', name: 'Self Induction', weightage: 1 },
                    { id: 'p12-5-5', name: 'Mutual Induction', weightage: 1 },
                    { id: 'p12-5-6', name: 'AC Generator', weightage: 1 }
                ]
            },
            {
                id: 'p12-6',
                unit: 'Alternating Current',
                topics: [
                    { id: 'p12-6-1', name: 'AC Voltage and Current', weightage: 1 },
                    { id: 'p12-6-2', name: 'AC through Resistor, Inductor and Capacitor', weightage: 2 },
                    { id: 'p12-6-3', name: 'LCR Circuit', weightage: 2 },
                    { id: 'p12-6-4', name: 'Resonance', weightage: 1 },
                    { id: 'p12-6-5', name: 'Power in AC Circuit', weightage: 1 },
                    { id: 'p12-6-6', name: 'Transformers', weightage: 1 }
                ]
            },
            {
                id: 'p12-7',
                unit: 'Electromagnetic Waves',
                topics: [
                    { id: 'p12-7-1', name: 'Displacement Current', weightage: 1 },
                    { id: 'p12-7-2', name: 'Electromagnetic Spectrum', weightage: 2 },
                    { id: 'p12-7-3', name: 'Propagation of Electromagnetic Waves', weightage: 1 }
                ]
            },
            {
                id: 'p12-8',
                unit: 'Ray Optics and Optical Instruments',
                topics: [
                    { id: 'p12-8-1', name: 'Reflection of Light', weightage: 1 },
                    { id: 'p12-8-2', name: 'Spherical Mirrors', weightage: 2 },
                    { id: 'p12-8-3', name: 'Refraction of Light', weightage: 1 },
                    { id: 'p12-8-4', name: 'Total Internal Reflection', weightage: 1 },
                    { id: 'p12-8-5', name: 'Lenses', weightage: 2 },
                    { id: 'p12-8-6', name: 'Refraction through Prism', weightage: 1 },
                    { id: 'p12-8-7', name: 'Optical Instruments', weightage: 2 }
                ]
            },
            {
                id: 'p12-9',
                unit: 'Wave Optics',
                topics: [
                    { id: 'p12-9-1', name: 'Huygens\' Principle', weightage: 1 },
                    { id: 'p12-9-2', name: 'Interference of Light', weightage: 2 },
                    { id: 'p12-9-3', name: 'Young\'s Double Slit Experiment', weightage: 2 },
                    { id: 'p12-9-4', name: 'Diffraction of Light', weightage: 1 },
                    { id: 'p12-9-5', name: 'Polarization', weightage: 1 }
                ]
            },
            {
                id: 'p12-10',
                unit: 'Dual Nature of Matter and Radiation',
                topics: [
                    { id: 'p12-10-1', name: 'Photoelectric Effect', weightage: 2 },
                    { id: 'p12-10-2', name: 'Matter Waves', weightage: 1 },
                    { id: 'p12-10-3', name: 'de Broglie Wavelength', weightage: 1 },
                    { id: 'p12-10-4', name: 'Davisson-Germer Experiment', weightage: 1 }
                ]
            },
            {
                id: 'p12-11',
                unit: 'Atoms',
                topics: [
                    { id: 'p12-11-1', name: 'Alpha Particle Scattering', weightage: 1 },
                    { id: 'p12-11-2', name: 'Bohr Model', weightage: 2 },
                    { id: 'p12-11-3', name: 'Hydrogen Spectrum', weightage: 1 }
                ]
            },
            {
                id: 'p12-12',
                unit: 'Nuclei',
                topics: [
                    { id: 'p12-12-1', name: 'Nuclear Properties', weightage: 1 },
                    { id: 'p12-12-2', name: 'Radioactivity', weightage: 1 },
                    { id: 'p12-12-3', name: 'Nuclear Binding Energy', weightage: 1 },
                    { id: 'p12-12-4', name: 'Nuclear Fission', weightage: 1 },
                    { id: 'p12-12-5', name: 'Nuclear Fusion', weightage: 1 }
                ]
            },
            {
                id: 'p12-13',
                unit: 'Semiconductor Electronics',
                topics: [
                    { id: 'p12-13-1', name: 'Semiconductor Diode', weightage: 1 },
                    { id: 'p12-13-2', name: 'p-n Junction', weightage: 1 },
                    { id: 'p12-13-3', name: 'Transistor', weightage: 1 },
                    { id: 'p12-13-4', name: 'Digital Electronics', weightage: 1 },
                    { id: 'p12-13-5', name: 'Logic Gates', weightage: 1 }
                ]
            }
        ]
    };
    
    // Chemistry syllabus data
    const chemistry = {
        // Class 11 topics
        class11: [
            {
                id: 'c11-1',
                unit: 'Some Basic Concepts of Chemistry',
                topics: [
                    { id: 'c11-1-1', name: 'Matter and its Classification', weightage: 1 },
                    { id: 'c11-1-2', name: 'Properties of Matter', weightage: 1 },
                    { id: 'c11-1-3', name: 'SI Units', weightage: 1 },
                    { id: 'c11-1-4', name: 'Significant Figures', weightage: 1 },
                    { id: 'c11-1-5', name: 'Laws of Chemical Combination', weightage: 1 },
                    { id: 'c11-1-6', name: 'Mole Concept', weightage: 2 },
                    { id: 'c11-1-7', name: 'Stoichiometry', weightage: 2 }
                ]
            },
            {
                id: 'c11-2',
                unit: 'Structure of Atom',
                topics: [
                    { id: 'c11-2-1', name: 'Discovery of Subatomic Particles', weightage: 1 },
                    { id: 'c11-2-2', name: 'Atomic Models', weightage: 1 },
                    { id: 'c11-2-3', name: 'Bohr\'s Atomic Model', weightage: 1 },
                    { id: 'c11-2-4', name: 'Quantum Mechanical Model', weightage: 1 },
                    { id: 'c11-2-5', name: 'Quantum Numbers', weightage: 1 },
                    { id: 'c11-2-6', name: 'Electronic Configuration', weightage: 2 }
                ]
            },
            {
                id: 'c11-3',
                unit: 'Classification of Elements and Periodicity',
                topics: [
                    { id: 'c11-3-1', name: 'Development of Periodic Table', weightage: 1 },
                    { id: 'c11-3-2', name: 'Modern Periodic Law', weightage: 1 },
                    { id: 'c11-3-3', name: 'Periodic Trends in Properties', weightage: 2 },
                    { id: 'c11-3-4', name: 'Periodic Trends in Chemical Properties', weightage: 1 }
                ]
            },
            {
                id: 'c11-4',
                unit: 'Chemical Bonding and Molecular Structure',
                topics: [
                    { id: 'c11-4-1', name: 'Ionic Bond', weightage: 1 },
                    { id: 'c11-4-2', name: 'Covalent Bond', weightage: 2 },
                    { id: 'c11-4-3', name: 'Lewis Structures', weightage: 1 },
                    { id: 'c11-4-4', name: 'VSEPR Theory', weightage: 2 },
                    { id: 'c11-4-5', name: 'Valence Bond Theory', weightage: 1 },
                    { id: 'c11-4-6', name: 'Hybridization', weightage: 2 },
                    { id: 'c11-4-7', name: 'Molecular Orbital Theory', weightage: 1 },
                    { id: 'c11-4-8', name: 'Hydrogen Bond', weightage: 1 }
                ]
            },
            {
                id: 'c11-5',
                unit: 'States of Matter',
                topics: [
                    { id: 'c11-5-1', name: 'Gas Laws', weightage: 2 },
                    { id: 'c11-5-2', name: 'Ideal Gas Equation', weightage: 1 },
                    { id: 'c11-5-3', name: 'Kinetic Theory of Gases', weightage: 1 },
                    { id: 'c11-5-4', name: 'Liquid State', weightage: 1 },
                    { id: 'c11-5-5', name: 'Solid State', weightage: 1 }
                ]
            },
            {
                id: 'c11-6',
                unit: 'Thermodynamics',
                topics: [
                    { id: 'c11-6-1', name: 'System and Surroundings', weightage: 1 },
                    { id: 'c11-6-2', name: 'First Law of Thermodynamics', weightage: 2 },
                    { id: 'c11-6-3', name: 'Enthalpy', weightage: 1 },
                    { id: 'c11-6-4', name: 'Hess\'s Law', weightage: 1 },
                    { id: 'c11-6-5', name: 'Second Law of Thermodynamics', weightage: 1 },
                    { id: 'c11-6-6', name: 'Entropy', weightage: 1 },
                    { id: 'c11-6-7', name: 'Gibbs Energy', weightage: 1 },
                    { id: 'c11-6-8', name: 'Spontaneity of Reactions', weightage: 1 }
                ]
            },
            {
                id: 'c11-7',
                unit: 'Equilibrium',
                topics: [
                    { id: 'c11-7-1', name: 'Chemical Equilibrium', weightage: 1 },
                    { id: 'c11-7-2', name: 'Law of Mass Action', weightage: 1 },
                    { id: 'c11-7-3', name: 'Equilibrium Constant', weightage: 2 },
                    { id: 'c11-7-4', name: 'Le Chatelier\'s Principle', weightage: 1 },
                    { id: 'c11-7-5', name: 'Ionic Equilibrium', weightage: 1 },
                    { id: 'c11-7-6', name: 'pH Scale', weightage: 1 },
                    { id: 'c11-7-7', name: 'Buffer Solutions', weightage: 1 },
                    { id: 'c11-7-8', name: 'Solubility Product', weightage: 1 }
                ]
            },
            {
                id: 'c11-8',
                unit: 'Redox Reactions',
                topics: [
                    { id: 'c11-8-1', name: 'Oxidation Number', weightage: 1 },
                    { id: 'c11-8-2', name: 'Balancing Redox Reactions', weightage: 2 },
                    { id: 'c11-8-3', name: 'Applications of Redox Reactions', weightage: 1 }
                ]
            },
            {
                id: 'c11-9',
                unit: 'Hydrogen',
                topics: [
                    { id: 'c11-9-1', name: 'Position in Periodic Table', weightage: 1 },
                    { id: 'c11-9-2', name: 'Isotopes of Hydrogen', weightage: 1 },
                    { id: 'c11-9-3', name: 'Preparation of Hydrogen', weightage: 1 },
                    { id: 'c11-9-4', name: 'Properties of Hydrogen', weightage: 1 },
                    { id: 'c11-9-5', name: 'Hydrides', weightage: 1 },
                    { id: 'c11-9-6', name: 'Water', weightage: 1 },
                    { id: 'c11-9-7', name: 'Hydrogen Peroxide', weightage: 1 }
                ]
            },
            {
                id: 'c11-10',
                unit: 's-Block Elements',
                topics: [
                    { id: 'c11-10-1', name: 'Group 1 Elements', weightage: 1 },
                    { id: 'c11-10-2', name: 'Alkali Metals', weightage: 1 },
                    { id: 'c11-10-3', name: 'Group 2 Elements', weightage: 1 },
                    { id: 'c11-10-4', name: 'Alkaline Earth Metals', weightage: 1 },
                    { id: 'c11-10-5', name: 'Biological Importance of Na, K, Mg and Ca', weightage: 1 }
                ]
            },
            {
                id: 'c11-11',
                unit: 'Some p-Block Elements',
                topics: [
                    { id: 'c11-11-1', name: 'Group 13 Elements', weightage: 1 },
                    { id: 'c11-11-2', name: 'Boron Family', weightage: 1 },
                    { id: 'c11-11-3', name: 'Group 14 Elements', weightage: 1 },
                    { id: 'c11-11-4', name: 'Carbon Family', weightage: 1 },
                    { id: 'c11-11-5', name: 'Allotropes of Carbon', weightage: 1 }
                ]
            },
            {
                id: 'c11-12',
                unit: 'Organic Chemistry - Basic Principles',
                topics: [
                    { id: 'c11-12-1', name: 'Classification of Organic Compounds', weightage: 1 },
                    { id: 'c11-12-2', name: 'IUPAC Nomenclature', weightage: 2 },
                    { id: 'c11-12-3', name: 'Isomerism', weightage: 2 },
                    { id: 'c11-12-4', name: 'Electronic Effects', weightage: 1 },
                    { id: 'c11-12-5', name: 'Reaction Intermediates', weightage: 1 },
                    { id: 'c11-12-6', name: 'Types of Organic Reactions', weightage: 1 }
                ]
            },
            {
                id: 'c11-13',
                unit: 'Hydrocarbons',
                topics: [
                    { id: 'c11-13-1', name: 'Alkanes', weightage: 1 },
                    { id: 'c11-13-2', name: 'Alkenes', weightage: 1 },
                    { id: 'c11-13-3', name: 'Alkynes', weightage: 1 },
                    { id: 'c11-13-4', name: 'Aromatic Hydrocarbons', weightage: 2 },
                    { id: 'c11-13-5', name: 'Petroleum', weightage: 1 }
                ]
            },
            {
                id: 'c11-14',
                unit: 'Environmental Chemistry',
                topics: [
                    { id: 'c11-14-1', name: 'Environmental Pollution', weightage: 1 },
                    { id: 'c11-14-2', name: 'Air Pollution', weightage: 1 },
                    { id: 'c11-14-3', name: 'Water Pollution', weightage: 1 },
                    { id: 'c11-14-4', name: 'Soil Pollution', weightage: 1 },
                    { id: 'c11-14-5', name: 'Green Chemistry', weightage: 1 }
                ]
            }
        ],
        
        // Class 12 topics
        class12: [
            {
                id: 'c12-1',
                unit: 'Solid State',
                topics: [
                    { id: 'c12-1-1', name: 'Classification of Solids', weightage: 1 },
                    { id: 'c12-1-2', name: 'Crystal Lattices', weightage: 1 },
                    { id: 'c12-1-3', name: 'Packing in Solids', weightage: 1 },
                    { id: 'c12-1-4', name: 'Imperfections in Solids', weightage: 1 },
                    { id: 'c12-1-5', name: 'Electrical and Magnetic Properties', weightage: 1 }
                ]
            },
            {
                id: 'c12-2',
                unit: 'Solutions',
                topics: [
                    { id: 'c12-2-1', name: 'Types of Solutions', weightage: 1 },
                    { id: 'c12-2-2', name: 'Expressing Concentration', weightage: 1 },
                    { id: 'c12-2-3', name: 'Solubility', weightage: 1 },
                    { id: 'c12-2-4', name: 'Colligative Properties', weightage: 2 },
                    { id: 'c12-2-5', name: 'Abnormal Molecular Masses', weightage: 1 }
                ]
            },
            {
                id: 'c12-3',
                unit: 'Electrochemistry',
                topics: [
                    { id: 'c12-3-1', name: 'Electrochemical Cells', weightage: 1 },
                    { id: 'c12-3-2', name: 'Galvanic Cells', weightage: 1 },
                    { id: 'c12-3-3', name: 'Nernst Equation', weightage: 1 },
                    { id: 'c12-3-4', name: 'Electrolysis', weightage: 1 },
                    { id: 'c12-3-5', name: 'Conductance', weightage: 1 },
                    { id: 'c12-3-6', name: 'Batteries', weightage: 1 },
                    { id: 'c12-3-7', name: 'Fuel Cells', weightage: 1 },
                    { id: 'c12-3-8', name: 'Corrosion', weightage: 1 }
                ]
            },
            {
                id: 'c12-4',
                unit: 'Chemical Kinetics',
                topics: [
                    { id: 'c12-4-1', name: 'Rate of Reaction', weightage: 1 },
                    { id: 'c12-4-2', name: 'Factors Affecting Rate', weightage: 1 },
                    { id: 'c12-4-3', name: 'Rate Law', weightage: 1 },
                    { id: 'c12-4-4', name: 'Order of Reaction', weightage: 2 },
                    { id: 'c12-4-5', name: 'Integrated Rate Equations', weightage: 1 },
                    { id: 'c12-4-6', name: 'Half-Life', weightage: 1 },
                    { id: 'c12-4-7', name: 'Collision Theory', weightage: 1 },
                    { id: 'c12-4-8', name: 'Activation Energy', weightage: 1 }
                ]
            },
            {
                id: 'c12-5',
                unit: 'Surface Chemistry',
                topics: [
                    { id: 'c12-5-1', name: 'Adsorption', weightage: 1 },
                    { id: 'c12-5-2', name: 'Catalysis', weightage: 1 },
                    { id: 'c12-5-3', name: 'Colloids', weightage: 1 },
                    { id: 'c12-5-4', name: 'Emulsions', weightage: 1 }
                ]
            },
            {
                id: 'c12-6',
                unit: 'General Principles of Isolation of Elements',
                topics: [
                    { id: 'c12-6-1', name: 'Occurrence of Metals', weightage: 1 },
                    { id: 'c12-6-2', name: 'Concentration of Ores', weightage: 1 },
                    { id: 'c12-6-3', name: 'Extraction of Metals', weightage: 1 },
                    { id: 'c12-6-4', name: 'Refining of Metals', weightage: 1 }
                ]
            },
            {
                id: 'c12-7',
                unit: 'p-Block Elements',
                topics: [
                    { id: 'c12-7-1', name: 'Group 15 Elements', weightage: 1 },
                    { id: 'c12-7-2', name: 'Nitrogen Compounds', weightage: 1 },
                    { id: 'c12-7-3', name: 'Phosphorus Compounds', weightage: 1 },
                    { id: 'c12-7-4', name: 'Group 16 Elements', weightage: 1 },
                    { id: 'c12-7-5', name: 'Oxygen Compounds', weightage: 1 },
                    { id: 'c12-7-6', name: 'Sulphur Compounds', weightage: 1 },
                    { id: 'c12-7-7', name: 'Group 17 Elements', weightage: 1 },
                    { id: 'c12-7-8', name: 'Halogens', weightage: 1 },
                    { id: 'c12-7-9', name: 'Group 18 Elements', weightage: 1 },
                    { id: 'c12-7-10', name: 'Noble Gases', weightage: 1 }
                ]
            },
            {
                id: 'c12-8',
                unit: 'd and f Block Elements',
                topics: [
                    { id: 'c12-8-1', name: 'Transition Elements', weightage: 1 },
                    { id: 'c12-8-2', name: 'Properties of d-Block Elements', weightage: 1 },
                    { id: 'c12-8-3', name: 'Some Important Compounds', weightage: 1 },
                    { id: 'c12-8-4', name: 'Lanthanoids', weightage: 1 },
                    { id: 'c12-8-5', name: 'Actinoids', weightage: 1 }
                ]
            },
            {
                id: 'c12-9',
                unit: 'Coordination Compounds',
                topics: [
                    { id: 'c12-9-1', name: 'Werner\'s Theory', weightage: 1 },
                    { id: 'c12-9-2', name: 'Nomenclature', weightage: 1 },
                    { id: 'c12-9-3', name: 'Bonding in Coordination Compounds', weightage: 1 },
                    { id: 'c12-9-4', name: 'Isomerism', weightage: 1 },
                    { id: 'c12-9-5', name: 'Applications of Coordination Compounds', weightage: 1 }
                ]
            },
            {
                id: 'c12-10',
                unit: 'Haloalkanes and Haloarenes',
                topics: [
                    { id: 'c12-10-1', name: 'Classification', weightage: 1 },
                    { id: 'c12-10-2', name: 'Nomenclature', weightage: 1 },
                    { id: 'c12-10-3', name: 'Properties of Haloalkanes', weightage: 1 },
                    { id: 'c12-10-4', name: 'SN1 and SN2 Reactions', weightage: 2 },
                    { id: 'c12-10-5', name: 'Reactions of Haloarenes', weightage: 1 },
                    { id: 'c12-10-6', name: 'Polyhalogen Compounds', weightage: 1 }
                ]
            },
            {
                id: 'c12-11',
                unit: 'Alcohols, Phenols and Ethers',
                topics: [
                    { id: 'c12-11-1', name: 'Classification', weightage: 1 },
                    { id: 'c12-11-2', name: 'Nomenclature', weightage: 1 },
                    { id: 'c12-11-3', name: 'Preparation of Alcohols', weightage: 1 },
                    { id: 'c12-11-4', name: 'Properties of Alcohols', weightage: 1 },
                    { id: 'c12-11-5', name: 'Preparation of Phenols', weightage: 1 },
                    { id: 'c12-11-6', name: 'Properties of Phenols', weightage: 1 },
                    { id: 'c12-11-7', name: 'Ethers', weightage: 1 }
                ]
            },
            {
                id: 'c12-12',
                unit: 'Aldehydes, Ketones and Carboxylic Acids',
                topics: [
                    { id: 'c12-12-1', name: 'Nomenclature', weightage: 1 },
                    { id: 'c12-12-2', name: 'Preparation of Aldehydes and Ketones', weightage: 1 },
                    { id: 'c12-12-3', name: 'Properties of Aldehydes and Ketones', weightage: 2 },
                    { id: 'c12-12-4', name: 'Preparation of Carboxylic Acids', weightage: 1 },
                    { id: 'c12-12-5', name: 'Properties of Carboxylic Acids', weightage: 1 }
                ]
            },
            {
                id: 'c12-13',
                unit: 'Amines',
                topics: [
                    { id: 'c12-13-1', name: 'Classification', weightage: 1 },
                    { id: 'c12-13-2', name: 'Nomenclature', weightage: 1 },
                    { id: 'c12-13-3', name: 'Preparation of Amines', weightage: 1 },
                    { id: 'c12-13-4', name: 'Properties of Amines', weightage: 1 },
                    { id: 'c12-13-5', name: 'Diazonium Salts', weightage: 1 }
                ]
            },
            {
                id: 'c12-14',
                unit: 'Biomolecules',
                topics: [
                    { id: 'c12-14-1', name: 'Carbohydrates', weightage: 1 },
                    { id: 'c12-14-2', name: 'Proteins', weightage: 1 },
                    { id: 'c12-14-3', name: 'Vitamins', weightage: 1 },
                    { id: 'c12-14-4', name: 'Nucleic Acids', weightage: 1 },
                    { id: 'c12-14-5', name: 'Enzymes', weightage: 1 },
                    { id: 'c12-14-6', name: 'Hormones', weightage: 1 }
                ]
            },
            {
                id: 'c12-15',
                unit: 'Polymers',
                topics: [
                    { id: 'c12-15-1', name: 'Classification of Polymers', weightage: 1 },
                    { id: 'c12-15-2', name: 'Methods of Polymerization', weightage: 1 },
                    { id: 'c12-15-3', name: 'Synthetic Polymers', weightage: 1 },
                    { id: 'c12-15-4', name: 'Natural Polymers', weightage: 1 },
                    { id: 'c12-15-5', name: 'Biodegradable Polymers', weightage: 1 }
                ]
            },
            {
                id: 'c12-16',
                unit: 'Chemistry in Everyday Life',
                topics: [
                    { id: 'c12-16-1', name: 'Drugs and their Classification', weightage: 1 },
                    { id: 'c12-16-2', name: 'Drug-Target Interaction', weightage: 1 },
                    { id: 'c12-16-3', name: 'Chemicals in Food', weightage: 1 },
                    { id: 'c12-16-4', name: 'Cleansing Agents', weightage: 1 }
                ]
            }
        ]
    };
    
    // Mathematics syllabus data
    const mathematics = {
        // Class 11 topics
        class11: [
            {
                id: 'm11-1',
                unit: 'Sets and Functions',
                topics: [
                    { id: 'm11-1-1', name: 'Sets', weightage: 1 },
                    { id: 'm11-1-2', name: 'Relations and Functions', weightage: 2 },
                    { id: 'm11-1-3', name: 'Trigonometric Functions', weightage: 3 }
                ]
            },
            {
                id: 'm11-2',
                unit: 'Algebra',
                topics: [
                    { id: 'm11-2-1', name: 'Principle of Mathematical Induction', weightage: 1 },
                    { id: 'm11-2-2', name: 'Complex Numbers', weightage: 2 },
                    { id: 'm11-2-3', name: 'Quadratic Equations', weightage: 2 },
                    { id: 'm11-2-4', name: 'Linear Inequalities', weightage: 1 },
                    { id: 'm11-2-5', name: 'Permutations and Combinations', weightage: 2 },
                    { id: 'm11-2-6', name: 'Binomial Theorem', weightage: 2 },
                    { id: 'm11-2-7', name: 'Sequences and Series', weightage: 2 }
                ]
            },
            {
                id: 'm11-3',
                unit: 'Coordinate Geometry',
                topics: [
                    { id: 'm11-3-1', name: 'Straight Lines', weightage: 2 },
                    { id: 'm11-3-2', name: 'Conic Sections', weightage: 3 },
                    { id: 'm11-3-3', name: 'Introduction to Three-dimensional Geometry', weightage: 1 }
                ]
            },
            {
                id: 'm11-4',
                unit: 'Calculus',
                topics: [
                    { id: 'm11-4-1', name: 'Limits', weightage: 2 },
                    { id: 'm11-4-2', name: 'Continuity', weightage: 1 },
                    { id: 'm11-4-3', name: 'Differentiation', weightage: 3 },
                    { id: 'm11-4-4', name: 'Applications of Derivatives', weightage: 3 }
                ]
            },
            {
                id: 'm11-5',
                unit: 'Mathematical Reasoning',
                topics: [
                    { id: 'm11-5-1', name: 'Logical Statements', weightage: 1 },
                    { id: 'm11-5-2', name: 'Connectives', weightage: 1 },
                    { id: 'm11-5-3', name: 'Validating Statements', weightage: 1 }
                ]
            },
            {
                id: 'm11-6',
                unit: 'Statistics and Probability',
                topics: [
                    { id: 'm11-6-1', name: 'Statistics', weightage: 2 },
                    { id: 'm11-6-2', name: 'Measures of Dispersion', weightage: 1 },
                    { id: 'm11-6-3', name: 'Probability', weightage: 3 },
                    { id: 'm11-6-4', name: 'Random Variables', weightage: 1 },
                    { id: 'm11-6-5', name: 'Probability Distributions', weightage: 1 }
                ]
            }
        ],
        
        // Class 12 topics
        class12: [
            {
                id: 'm12-1',
                unit: 'Relations and Functions',
                topics: [
                    { id: 'm12-1-1', name: 'Types of Relations', weightage: 1 },
                    { id: 'm12-1-2', name: 'Types of Functions', weightage: 1 },
                    { id: 'm12-1-3', name: 'Composition of Functions', weightage: 1 },
                    { id: 'm12-1-4', name: 'Inverse of a Function', weightage: 1 },
                    { id: 'm12-1-5', name: 'Binary Operations', weightage: 1 }
                ]
            },
            {
                id: 'm12-2',
                unit: 'Inverse Trigonometric Functions',
                topics: [
                    { id: 'm12-2-1', name: 'Definition and Properties', weightage: 1 },
                    { id: 'm12-2-2', name: 'Elementary Properties', weightage: 1 },
                    { id: 'm12-2-3', name: 'Graphs', weightage: 1 }
                ]
            },
            {
                id: 'm12-3',
                unit: 'Matrices',
                topics: [
                    { id: 'm12-3-1', name: 'Types of Matrices', weightage: 1 },
                    { id: 'm12-3-2', name: 'Operations on Matrices', weightage: 1 },
                    { id: 'm12-3-3', name: 'Determinant of a Matrix', weightage: 2 },
                    { id: 'm12-3-4', name: 'Inverse of a Matrix', weightage: 1 },
                    { id: 'm12-3-5', name: 'Applications of Matrices', weightage: 1 }
                ]
            },
            {
                id: 'm12-4',
                unit: 'Determinants',
                topics: [
                    { id: 'm12-4-1', name: 'Properties of Determinants', weightage: 1 },
                    { id: 'm12-4-2', name: 'Area of a Triangle', weightage: 1 },
                    { id: 'm12-4-3', name: 'Minors and Cofactors', weightage: 1 },
                    { id: 'm12-4-4', name: 'Applications of Determinants', weightage: 1 },
                    { id: 'm12-4-5', name: 'Adjoint and Inverse of a Matrix using Determinants', weightage: 1 }
                ]
            },
            {
                id: 'm12-5',
                unit: 'Continuity and Differentiability',
                topics: [
                    { id: 'm12-5-1', name: 'Continuity', weightage: 2 },
                    { id: 'm12-5-2', name: 'Differentiability', weightage: 2 },
                    { id: 'm12-5-3', name: 'Exponential and Logarithmic Functions', weightage: 2 },
                    { id: 'm12-5-4', name: 'Logarithmic Differentiation', weightage: 1 },
                    { id: 'm12-5-5', name: 'Derivatives of Implicit Functions', weightage: 1 },
                    { id: 'm12-5-6', name: 'Second Order Derivatives', weightage: 1 }
                ]
            },
            {
                id: 'm12-6',
                unit: 'Applications of Derivatives',
                topics: [
                    { id: 'm12-6-1', name: 'Rate of Change', weightage: 1 },
                    { id: 'm12-6-2', name: 'Increasing and Decreasing Functions', weightage: 1 },
                    { id: 'm12-6-3', name: 'Tangents and Normals', weightage: 1 },
                    { id: 'm12-6-4', name: 'Maxima and Minima', weightage: 2 },
                    { id: 'm12-6-5', name: 'Approximations', weightage: 1 }
                ]
            },
            {
                id: 'm12-7',
                unit: 'Integrals',
                topics: [
                    { id: 'm12-7-1', name: 'Integration as Inverse of Differentiation', weightage: 1 },
                    { id: 'm12-7-2', name: 'Methods of Integration', weightage: 3 },
                    { id: 'm12-7-3', name: 'Definite Integrals', weightage: 2 },
                    { id: 'm12-7-4', name: 'Properties of Definite Integrals', weightage: 1 }
                ]
            },
            {
                id: 'm12-8',
                unit: 'Applications of Integrals',
                topics: [
                    { id: 'm12-8-1', name: 'Area Under Curves', weightage: 2 },
                    { id: 'm12-8-2', name: 'Area Between Curves', weightage: 2 },
                    { id: 'm12-8-3', name: 'Applications in Physics', weightage: 1 }
                ]
            },
            {
                id: 'm12-9',
                unit: 'Differential Equations',
                topics: [
                    { id: 'm12-9-1', name: 'Order and Degree', weightage: 1 },
                    { id: 'm12-9-2', name: 'Formulation of Differential Equations', weightage: 1 },
                    { id: 'm12-9-3', name: 'Solutions of First Order, First Degree DEs', weightage: 2 },
                    { id: 'm12-9-4', name: 'Applications of Differential Equations', weightage: 1 }
                ]
            },
            {
                id: 'm12-10',
                unit: 'Vector Algebra',
                topics: [
                    { id: 'm12-10-1', name: 'Vectors and Scalars', weightage: 1 },
                    { id: 'm12-10-2', name: 'Vector Addition', weightage: 1 },
                    { id: 'm12-10-3', name: 'Scalar Multiplication', weightage: 1 },
                    { id: 'm12-10-4', name: 'Products of Vectors', weightage: 1 },
                    { id: 'm12-10-5', name: 'Vector Equations of Line and Plane', weightage: 2 }
                ]
            },
            {
                id: 'm12-11',
                unit: 'Three Dimensional Geometry',
                topics: [
                    { id: 'm12-11-1', name: 'Direction Cosines and Ratios', weightage: 1 },
                    { id: 'm12-11-2', name: 'Straight Line in Space', weightage: 1 },
                    { id: 'm12-11-3', name: 'Plane', weightage: 1 },
                    { id: 'm12-11-4', name: 'Shortest Distance between Lines', weightage: 1 },
                    { id: 'm12-11-5', name: 'Angle between Line and Plane', weightage: 1 }
                ]
            },
            {
                id: 'm12-12',
                unit: 'Linear Programming',
                topics: [
                    { id: 'm12-12-1', name: 'Linear Programming Problems', weightage: 1 },
                    { id: 'm12-12-2', name: 'Mathematical Formulation', weightage: 1 },
                    { id: 'm12-12-3', name: 'Graphical Method of Solution', weightage: 2 },
                    { id: 'm12-12-4', name: 'Different Types of LPP', weightage: 1 }
                ]
            },
            {
                id: 'm12-13',
                unit: 'Probability',
                topics: [
                    { id: 'm12-13-1', name: 'Conditional Probability', weightage: 2 },
                    { id: 'm12-13-2', name: 'Multiplication Theorem', weightage: 1 },
                    { id: 'm12-13-3', name: 'Independent Events', weightage: 1 },
                    { id: 'm12-13-4', name: 'Bayes\' Theorem', weightage: 2 },
                    { id: 'm12-13-5', name: 'Random Variables', weightage: 1 },
                    { id: 'm12-13-6', name: 'Binomial Distribution', weightage: 1 }
                ]
            }
        ]
    };
    
    return {
        physics,
        chemistry,
        mathematics
    };
})();
